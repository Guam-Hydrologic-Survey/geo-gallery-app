/*
thumbs.js
Description: Generates the thumbnails for photos instead of getting the full resolution for gallery display.
Also keeps run logs so you can see what was added, deleted, and generated per directory:
  thumbs-log.txt        every directory, every run (appended)
  thumbs-changes.txt    only the directories that changed, every run (appended)
  thumbs-summary.txt    image count per directory (overwritten)
  thumbs-inventory.txt  every image per directory (overwritten)
  thumbs-log.json       last run, snapshot used for the next comparison, run history
*/

const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const uploads_dir = path.resolve(process.env.UPLOADS_DIR || path.join(__dirname, '../uploads'));
const thumbs = path.resolve(process.env.THUMBS_DIR || path.join(uploads_dir, 'thumbs'));
const img_exts = new Set(['.jpeg', '.jpg', '.png', '.webp', '.tif', '.tiff']);

const width = 400;
const quality = 75;

// logging
const log_dir = path.resolve(process.env.LOGS_DIR || path.join(__dirname, 'log'));
const log_json = path.join(log_dir, 'image-log.json');             // last run, snapshot, history
const log_txt = path.join(log_dir, 'image-log.txt');               // readable, newest run at the bottom
const changes_txt = path.join(log_dir, 'image-changes.txt');
const inventory_txt = path.join(log_dir, 'image-inventory.txt');   // every image per directory (overwritten each run)
const summary_txt = path.join(log_dir, 'image-summary.txt');       // image count per directory only (overwritten each run)
const max_history = 200;

// delete the thumbnail of any image that was in uploads last run but is gone now.
const delete_removed_thumbs = true;

// also delete ANY thumbnail that has no matching original (including ones left over from before this
// logging existed). Leave false for normal use; set true for one run to clean up, then set it back.
const prune_orphans = false;

const toKey = (p) => p.split(path.sep).join('/');

// recursively collect image file paths, skip the thumbs dir
async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'thumbs') continue;
            files = files.concat(await walk(full));
        } else if (img_exts.has(path.extname(entry.name).toLowerCase())) {
            files.push(full);
        }
    }
    return files;
}

// recursively collect existing thumbnail (.webp) paths
async function walkThumbs(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) files = files.concat(await walkThumbs(full));
        else if (path.extname(entry.name).toLowerCase() === '.webp') files.push(full);
    }
    return files;
}

// remove a thumbs subfolder (and empty parents) once its last thumbnail is gone
async function removeEmptyDirs(dir) {
    while (dir !== thumbs && dir.startsWith(thumbs)) {
        try { await fs.rmdir(dir); } catch (_) { break; } // fails if not empty
        dir = path.dirname(dir);
    }
}

// returns { status: 'created' | 'updated' | 'skipped' }
async function createThumbnail(src_path) {
    const rel = path.relative(uploads_dir, src_path);
    const name = path.parse(rel).name + '.webp';
    const rel_dir = path.dirname(rel);
    const dest_dir = path.join(thumbs, rel_dir);
    const dest = path.join(dest_dir, name);

    await fs.mkdir(dest_dir, { recursive: true });

    // if the thumbnail already exists and is newer than the original, skip
    let existed = false;
    try {
        const [s, d] = await Promise.all([fs.stat(src_path), fs.stat(dest)]);
        existed = true;
        if (d.mtimeMs >= s.mtimeMs) return { status: 'skipped' };
    } catch (_) { }

    await sharp(src_path)
        .rotate()
        .resize({ width: width, withoutEnlargement: true })
        .webp({ quality: quality })
        .toFile(dest);

    return { status: existed ? 'updated' : 'created' };
}

async function readLog() {
    try {
        return JSON.parse(await fs.readFile(log_json, 'utf8'));
    } catch (_) {
        return { lastRun: null, snapshot: null, history: [] };
    }
}

const hasChanges = (d) =>
    d.added.length || d.deleted.length || d.thumbs_created.length ||
    d.thumbs_updated.length || d.thumbs_deleted.length;

function dirLines(d, verbose) {
    const lines = [];
    d.added.forEach((f) => lines.push(`  + ${f}`));
    d.deleted.forEach((f) => lines.push(`  - ${f} (original deleted)`));
    d.thumbs_created.forEach((f) => lines.push(`  thumb created: ${f}`));
    d.thumbs_updated.forEach((f) => lines.push(`  thumb updated: ${f}`));
    d.thumbs_deleted.forEach((f) => lines.push(`  thumb deleted: ${f}`));
    if (verbose) {
        d.orphan_thumbs.forEach((f) => lines.push(`  thumb orphaned (no original): ${f}`));
        d.failed.forEach((f) => lines.push(`  FAILED ${f.file}: ${f.error}`));
    }
    return lines;
}

// every directory
function formatRun(entry) {
    const lines = [`=== ${entry.ranAt}${entry.firstRun ? ' (first run: all images counted as added)' : ''} ===`];
    for (const [dir, d] of Object.entries(entry.directories)) {
        lines.push(
            `[${dir}] ${d.images} images (+${d.added.length} added, -${d.deleted.length} deleted) | ` +
            `thumbs: ${d.thumbs_created.length} created, ${d.thumbs_updated.length} updated, ` +
            `${d.thumbs_skipped} up to date, ${d.thumbs_deleted.length} deleted, ` +
            `${d.failed.length} failed, ${d.orphan_thumbs.length} orphaned`
        );
        lines.push(...dirLines(d, true));
    }
    const t = entry.totals;
    lines.push(
        `Totals: ${t.images} images, +${t.added} added, -${t.deleted} deleted | thumbs: ` +
        `${t.thumbs_created} created, ${t.thumbs_updated} updated, ${t.thumbs_skipped} up to date, ` +
        `${t.thumbs_deleted} deleted, ${t.failed} failed, ${t.orphan_thumbs} orphaned`
    );
    return lines.join('\n') + '\n\n';
}

// only directories that changed
function formatChanges(entry) {
    const all = Object.entries(entry.directories);
    const changed = all.filter(([, d]) => hasChanges(d));
    const lines = [`=== ${entry.ranAt}${entry.firstRun ? ' (first run)' : ''} ===`];
    if (!changed.length) {
        lines.push('No folders changed.');
    } else {
        lines.push(`${changed.length} of ${all.length} folders changed:`);
        for (const [dir, d] of changed) {
            lines.push(
                `[${dir}] +${d.added.length} added, -${d.deleted.length} deleted | thumbs: ` +
                `${d.thumbs_created.length} created, ${d.thumbs_updated.length} updated, ${d.thumbs_deleted.length} deleted`
            );
            lines.push(...dirLines(d, false));
        }
    }
    return lines.join('\n') + '\n\n';
}

function formatInventory(ranAt, snapshot) {
    const lines = [`Image inventory as of ${ranAt}`, ''];
    for (const dir of Object.keys(snapshot).sort()) {
        lines.push(`[${dir}] ${snapshot[dir].length} images`);
        snapshot[dir].forEach((f) => lines.push(`  ${f}`));
        lines.push('');
    }
    return lines.join('\n');
}

function formatSummary(ranAt, snapshot) {
    const dirs = Object.keys(snapshot).sort();
    const pad = Math.max(0, ...dirs.map((d) => d.length));
    const lines = [`Image counts as of ${ranAt}`, ''];
    let total = 0;
    for (const dir of dirs) {
        const n = snapshot[dir].length;
        total += n;
        lines.push(`${dir.padEnd(pad)}  ${n}`);
    }
    lines.push('', `Total: ${total} images in ${dirs.length} directories`);
    return lines.join('\n') + '\n';
}

(async () => {
    console.log("Running thumbs.js...");
    await fs.mkdir(thumbs, { recursive: true });
    const files = await walk(uploads_dir);

    // make thumbnails
    const results = [];
    for (const f of files) {
        const rel = path.relative(uploads_dir, f);
        const dir = toKey(path.dirname(rel));
        const file = path.basename(rel);
        try {
            const r = await createThumbnail(f);
            results.push({ dir, file, status: r.status });
        } catch (err) {
            results.push({ dir, file, status: 'failed', error: err.message });
            console.error(`FAILED ${f}: ${err.message}`);
        }
    }

    // current snapshot of original images: { dir: [filenames] }
    const now = {};
    for (const r of results) (now[r.dir] ||= []).push(r.file);
    Object.values(now).forEach((arr) => arr.sort());

    const log = await readLog();
    const prev = log.snapshot || {};

    // thumbnail paths that should exist given the current originals
    const expected = new Set(files.map((f) => {
        const rel = path.relative(uploads_dir, f);
        return toKey(path.join(path.dirname(rel), path.parse(rel).name + '.webp'));
    }));

    const deleted_thumbs = []; // thumb paths (relative to thumbs/) removed this run

    // 1) delete thumbs for images that were present last run but are gone now
    if (delete_removed_thumbs) {
        for (const [dir, list] of Object.entries(prev)) {
            const nowSet = new Set(now[dir] || []);
            for (const file of list) {
                if (nowSet.has(file)) continue;
                const rel = path.posix.join(dir, path.parse(file).name + '.webp');
                if (expected.has(rel)) continue; // another original (e.g. a.jpg -> a.png) still uses this thumb
                const full = path.join(thumbs, rel);
                try {
                    await fs.unlink(full);
                    deleted_thumbs.push(rel);
                    await removeEmptyDirs(path.dirname(full));
                } catch (_) { } // thumb was already gone
            }
        }
    }

    // 2) anything left with no matching original is an orphan (optionally pruned)
    const orphans = [];
    for (const t of await walkThumbs(thumbs)) {
        const rel = toKey(path.relative(thumbs, t));
        if (expected.has(rel)) continue;
        if (prune_orphans) {
            await fs.unlink(t);
            deleted_thumbs.push(rel);
            await removeEmptyDirs(path.dirname(t));
        } else {
            orphans.push(rel);
        }
    }

    // compare with the previous run
    const dirs = [...new Set([
        ...Object.keys(prev),
        ...Object.keys(now),
        ...deleted_thumbs.map((o) => path.posix.dirname(o)),
        ...orphans.map((o) => path.posix.dirname(o)),
    ])].sort();

    const directories = {};
    for (const dir of dirs) {
        const prevSet = new Set(prev[dir] || []);
        const nowList = now[dir] || [];
        const nowSet = new Set(nowList);
        const rs = results.filter((r) => r.dir === dir);
        const pick = (s) => rs.filter((r) => r.status === s).map((r) => r.file);
        const inDir = (o) => path.posix.dirname(o) === dir;
        directories[dir] = {
            images: nowList.length,
            added: nowList.filter((f) => !prevSet.has(f)),
            deleted: [...prevSet].filter((f) => !nowSet.has(f)).sort(),
            thumbs_created: pick('created'),
            thumbs_updated: pick('updated'),
            thumbs_skipped: pick('skipped').length,
            thumbs_deleted: deleted_thumbs.filter(inDir).map((o) => path.posix.basename(o)),
            failed: rs.filter((r) => r.status === 'failed').map((r) => ({ file: r.file, error: r.error })),
            orphan_thumbs: orphans.filter(inDir),
        };
    }

    const sum = (fn) => Object.values(directories).reduce((n, d) => n + fn(d), 0);
    const entry = {
        ranAt: new Date().toISOString(),
        firstRun: !log.snapshot,
        directories,
        totals: {
            images: sum((d) => d.images),
            added: sum((d) => d.added.length),
            deleted: sum((d) => d.deleted.length),
            thumbs_created: sum((d) => d.thumbs_created.length),
            thumbs_updated: sum((d) => d.thumbs_updated.length),
            thumbs_skipped: sum((d) => d.thumbs_skipped),
            thumbs_deleted: sum((d) => d.thumbs_deleted.length),
            failed: sum((d) => d.failed.length),
            orphan_thumbs: sum((d) => d.orphan_thumbs.length),
        },
    };

    // write logs
    const newLog = {
        lastRun: entry.ranAt,
        snapshot: now,
        history: [...(log.history || []), entry].slice(-max_history),
    };
    await fs.writeFile(log_json, JSON.stringify(newLog, null, 2));
    await fs.appendFile(log_txt, formatRun(entry));
    await fs.appendFile(changes_txt, formatChanges(entry));
    await fs.writeFile(inventory_txt, formatInventory(entry.ranAt, now));
    await fs.writeFile(summary_txt, formatSummary(entry.ranAt, now));

    const t = entry.totals;
    console.log(
        `------\nRan thumbs.js. Results:\n${t.thumbs_created + t.thumbs_updated} created, ` +
        `${t.thumbs_skipped} up to date, ${t.failed} failed.\n` +
        `Images: +${t.added} added, -${t.deleted} deleted. \nLog: \n${log_txt} \nSummary: \n${summary_txt}`
    );
})();