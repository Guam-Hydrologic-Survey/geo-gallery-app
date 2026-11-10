/*
thumbs.js
Description: Generates the thumbnails for photos instead of getting the full resolution for gallery display.
Also writes a run log (thumbs-log.txt / thumbs-log.json) and a full image inventory (thumbs-inventory.txt)
so you can see what was added, deleted, and generated per directory on each run.
*/

const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const uploads_dir = path.join(__dirname, '..', '..', 'uploads');
const thumbs = path.join(uploads_dir, 'thumbs');
const img_exts = new Set(['.jpeg', '.jpg', '.png', '.webp', '.tif', '.tiff']);

const width = 400;
const quality = 75;

// logging
const log_dir = path.join(__dirname, "..", "log");
const log_json = path.join(log_dir, 'thumbs-log.json');       // last run, snapshot, history
const log_txt = path.join(log_dir, 'thumbs-log.txt');         // readable, newest run at the bottom
const inventory_txt = path.join(log_dir, 'thumbs-inventory.txt'); // every image per directory (overwritten each run)
const max_history = 200;

// thumbs whose original image no longer exists: always reported.
// set to true to also delete them (they then show up as "thumbs deleted" in the log).
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

function formatRun(entry) {
    const lines = [`=== ${entry.ranAt}${entry.firstRun ? ' (first run: all images counted as added)' : ''} ===`];
    for (const [dir, d] of Object.entries(entry.directories)) {
        lines.push(
            `[${dir}] ${d.images} images (+${d.added.length} added, -${d.deleted.length} deleted) | ` +
            `thumbs: ${d.thumbs_created.length} created, ${d.thumbs_updated.length} updated, ` +
            `${d.thumbs_skipped} up to date, ${d.failed.length} failed, ` +
            `${d.orphan_thumbs.length} ${prune_orphans ? 'deleted' : 'orphaned'}`
        );
        d.added.forEach((f) => lines.push(`  + ${f}`));
        d.deleted.forEach((f) => lines.push(`  - ${f} (original deleted)`));
        d.thumbs_created.forEach((f) => lines.push(`  thumb created: ${f}`));
        d.thumbs_updated.forEach((f) => lines.push(`  thumb updated: ${f}`));
        d.orphan_thumbs.forEach((f) => lines.push(`  thumb ${prune_orphans ? 'deleted' : 'orphaned (no original)'}: ${f}`));
        d.failed.forEach((f) => lines.push(`  FAILED ${f.file}: ${f.error}`));
    }
    const t = entry.totals;
    lines.push(
        `Totals: ${t.images} images, +${t.added} added, -${t.deleted} deleted | thumbs: ` +
        `${t.thumbs_created} created, ${t.thumbs_updated} updated, ${t.thumbs_skipped} up to date, ` +
        `${t.failed} failed, ${t.orphan_thumbs} ${prune_orphans ? 'deleted' : 'orphaned'}`
    );
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

    // thumbnails with no matching original
    const expected = new Set(files.map((f) => {
        const rel = path.relative(uploads_dir, f);
        return toKey(path.join(path.dirname(rel), path.parse(rel).name + '.webp'));
    }));
    const orphans = [];
    for (const t of await walkThumbs(thumbs)) {
        const rel = toKey(path.relative(thumbs, t));
        if (!expected.has(rel)) {
            orphans.push(rel);
            if (prune_orphans) await fs.unlink(t);
        }
    }

    // compare with the previous run
    const log = await readLog();
    const prev = log.snapshot || {};
    const dirs = [...new Set([
        ...Object.keys(prev),
        ...Object.keys(now),
        ...orphans.map((o) => path.posix.dirname(o)),
    ])].sort();

    const directories = {};
    for (const dir of dirs) {
        const prevSet = new Set(prev[dir] || []);
        const nowList = now[dir] || [];
        const nowSet = new Set(nowList);
        const rs = results.filter((r) => r.dir === dir);
        const pick = (s) => rs.filter((r) => r.status === s).map((r) => r.file);
        directories[dir] = {
            images: nowList.length,
            added: nowList.filter((f) => !prevSet.has(f)),
            deleted: [...prevSet].filter((f) => !nowSet.has(f)).sort(),
            thumbs_created: pick('created'),
            thumbs_updated: pick('updated'),
            thumbs_skipped: pick('skipped').length,
            failed: rs.filter((r) => r.status === 'failed').map((r) => ({ file: r.file, error: r.error })),
            orphan_thumbs: orphans.filter((o) => path.posix.dirname(o) === dir),
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
    await fs.writeFile(inventory_txt, formatInventory(entry.ranAt, now));

    const t = entry.totals;
    console.log(
        `------\nRan thumbs.js. Results:\n${t.thumbs_created + t.thumbs_updated} created, ` +
        `${t.thumbs_skipped} up to date, ${t.failed} failed.\n` +
        `Images: +${t.added} added, -${t.deleted} deleted. \nLog: ${log_txt}`
    );
})();