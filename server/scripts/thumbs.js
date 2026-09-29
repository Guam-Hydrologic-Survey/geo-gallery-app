/*
thumbs.js
Description: Generates the thumbnails for photos instead of getting the full resolution for gallery display
*/

const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp'); 

const uploads_dir = path.join(__dirname, '..', '..', 'uploads');
const thumbs = path.join(uploads_dir, 'thumbs');
const img_exts = new Set(['.jpeg', '.jpg', '.png', '.webp', '.tif', '.tiff']);

const width = 400;
const quality = 75;

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

async function createThumbnail(src_path) {
    const rel = path.relative(uploads_dir, src_path);
    const name = path.parse(rel).name + '.webp';
    const rel_dir = path.dirname(rel);
    const dest_dir = path.join(thumbs, rel_dir);
    const dest = path.join(dest_dir, name);
    const display_name = path.join(rel_dir, name);

    await fs.mkdir(dest_dir, { recursive: true });

    // if the thumbnail already exists, skip 
    try {
        const [s, d] = await Promise.all([fs.stat(src_path), fs.stat(dest)]);
        if (dmtimeMs >= s.mtimeMs) return { name: display_name, skipped: true };
    } catch (_) { }

    await sharp(src_path)
    .rotate()
    .resize({ width: width, withoutEnlargement: true })
    .webp({ quality: quality})
    .toFile(dest);

    return { name: display_name, skipped: false };
}

(async () => {
    console.log("Running thumbs.js...")
    await fs.mkdir(thumbs, {recursive: true });
    const files = await walk(uploads_dir);

    let made = 0, skipped = 0, failed = 0;
    for (const f of files) {
        try {
            const r = await createThumbnail(f);
            r.skipped ? skipped++ : made++;
        } catch (err) {
            failed++;
            console.error(`FAILED ${f}: ${err.message}`);
        }
    }
    console.log(`Ran thumbs.js. Results:\n${made} created, ${skipped} up to date, ${failed} failed.`)
})();