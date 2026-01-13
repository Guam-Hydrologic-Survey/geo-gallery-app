require('dotenv').config(); // load environment variables 

const express = require('express');
const cors = require('cors');

const fs = require('fs'); 
const path = require('path');

const fileType = require('file-type');
const Papa = require('papaparse');

const app = express();
const PORT = process.env.PORT || 3000; 

const photosDirectory = path.join(__dirname, 'photos');

app.use(cors()); // enable cors for frontend requests

// serve static files 
app.use('/photos', express.static(photosDirectory));
// app.use('/description', express.static(photosDirectory));

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
                const buffer = await fs.promises.readFile(photoPath);
                const type = await fileType.fromBuffer(buffer);

                if (type) {
                    if (type.mime.startsWith('image/')) {
                        if (!results['images']) { results['images'] = []; }
                        results['images'].push(relativePath);
                    } 
                } else {
                    if (isTextFile(buffer)) {
                        if (!results['text']) { results['text'] = []; }
                        results['text'].push(relativePath);
                    } else {
                        if (!results['unknown']) { results['unknown'] = []; }
                        results['unknown'].push(relativePath);
                    }
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
    return /^[\x20-\x7E\r\n\t]*$/.test(text); // ensures it contains only printable characters 
}

// endpoint to read and parse csv file 
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

// start the backend server 
app.listen(PORT, () => {
    const svr = `http://localhost:${PORT}`;
    console.log(`\nExample app is listening on ${svr}`);
    console.log(`>> View Photos API endpoint: ${svr}/api/photos`);
    console.log(`>> View GeoJSON API endpoint: ${svr}/api/data/points.json`);
    console.log(`>> View Descriptions API endpoint: ${svr}/descriptions`);
});