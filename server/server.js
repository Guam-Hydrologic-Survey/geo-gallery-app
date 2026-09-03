// require('dotenv').config(); // load environment variables 

const express = require('express');
const cors = require('cors');

const fs = require('fs'); 
const path = require('path');

const fileType = require('file-type');
const Papa = require('papaparse');

const app = express();
// const PORT = process.env.PORT || 3000; 

const PORT = 3000; 

// const photosDirectory = path.join(__dirname, 'photos');
// const photosDirectory = '../uploads';

const photosDirectory = path.join(__dirname, '../uploads');

const image_extensions = ['.jpg', '.jpeg', '.png']

app.use(cors()); // enable cors for frontend requests

// serve static files 
app.use('/photos', express.static(photosDirectory));
// app.use('/description', express.static(photosDirectory));

// server frontend
// app.use(express.static(path.join(__dirname, '../client/dist')));

async function detectFileType(filePath) {
    const fileHandle = await fs.promises.open(filePath, 'r');
    
    try {
        const { size } = await fileHandle.stat();
        const readLength = Math.min(size, 4100); 
        const buffer = Buffer.alloc(readLength);
        
        await fileHandle.read(buffer, 0, readLength, 0);
        
        const type = await fileType.fromBuffer(buffer);

        return { type, buffer }
    } finally {
        await fileHandle.close();
    }
}

async function getPhotosInDirectory(dir, basePath) {
    let results = {};

    try {
        const photos = await fs.promises.readdir(dir, { withFileTypes: true });
        
        for (const photo of photos) {
            const photoPath = path.join(dir, photo.name);
            const relativePath = path.relative(basePath, photoPath).replace(/\\/g, '/'); // normalize paths for frontend use 

            if (photo.isDirectory()) {
                // recursively get files from subdirectory 
                results[photo.name] = await getPhotosInDirectory(photoPath, basePath);
            } else {
                
                // read a portion of the file buffer for type detection
                // and avoid loading full images into memory
                const { type, buffer } = await detectFileType(photoPath);

                if (type) {
                    if (type.mime.startsWith('image/')) {
                        if (!results['images']) { results['images'] = []; }
                        results['images'].push(relativePath);
                    } 
                } else {
                    if (isTextFile(buffer)) {
                        if (!results['text']) { results['text'] = []; results['description'] = ''; }
                        results['text'].push(relativePath);
                        // results['description'] = buffer.toString('utf-8');
                        results['description'] = await fs.promises.readFile(photoPath, 'utf-8');
                    } 
                    // else {
                    //     if (!results['unknown']) { results['unknown'] = []; }
                    //     results['unknown'].push(relativePath);
                    // }
                }
            }
        }
    } catch (error) {
        console.error('Error reading directory', error);
    }
    return results;
}

// check if a file is a text file
function isTextFile(buffer) {
    // convert buffer to string and check for non-printable characters 
    const text = buffer.toString('utf-8');

    // ensures it contains only printable characters 
    return /^[\x20-\x7E\r\n\t]*$/.test(text);
}

// endpoint to read and parse a master csv file containing descriptions for each 
app.get('/descriptions', (req, res) => {
    const filePath = photosDirectory + '/descriptions.csv';
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // parse csv file 
    Papa.parse(fileContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
            res.json(results.data);
        },
        error: (error) => {
            console.error('Error parsing CSV file: ', error);
            res.status(500).send('Error parsing CSV file :-(');
        }
    })
});

// endpoint to read and parse description 
app.get('/api/descriptions', (req, res) => {
    const filePath = photosDirectory;
});

// endpoint to get photo directories and subdirectories 
app.get('/api/photos', async (req, res) => {
    try {
        const filesData = await getPhotosInDirectory(photosDirectory, photosDirectory);
        res.json({ photos: filesData });
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve photos :-('});
    }
})

// endpoint to get the data file containing geojson 
app.get('/api/data/:filename', (req, res) => {
    const jsonFilePath = path.join(__dirname, 'data', req.params.filename);
    fs.readFile(jsonFilePath, 'utf8', (err, geojson) => {
        if (err) {
            return res.status(404).json({ error: 'File not found :-(' });
        }
        res.json(JSON.parse(geojson));
    });
});

// // SPA fallback for vite apps 
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

// start the backend server 
app.listen(PORT, () => {
    const svr = `http://localhost:${PORT}`;
    console.log(`\nExample app is listening on ${svr}`);
    console.log(`>> View Photos API endpoint: ${svr}/api/photos`);
    console.log(`>> View GeoJSON API endpoint: ${svr}/api/data/points.json`);
    console.log(`>> View Descriptions API endpoint: ${svr}/descriptions`);
});