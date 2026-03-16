/* 
LMap.js
*/

import { BaseLayers } from "./Baselayers";

export function LMap(element) {

    const map = initMap(element);

    mapControls(map, maxZoom);
    getMapData(map);
}

// initialize map 
function initMap(element) {
    const center = [13.5286582,144.8251116];
    const defaultZoom = 13;
    const maxZoom = 19; 

    // creates Leaflet map 
    const map = L.map(element, {
        center: center,
        zoom: defaultZoom,
        zoomControl: false,
    });

    return map;
}

// adds map controls to maps 
function mapControls(map, maxZoom) {
    const baseLayers = BaseLayers(map, maxZoom);

    const layerControl = L.control.layers(baseLayers, null, { position: "bottomright" });
    layerControl.addTo(map);

    const zoomControl = L.control.zoom({
        // options: topleft, topright, bottomleft, bottomright 
        position: "bottomright"
    });
    zoomControl.addTo(map);
}

// retrieves geojson data and populates map 
function getMapData(map) {
    fetch("/api/data/points.json")
    .then(response => response.json())
    .then(geojson => {
        L.geoJSON(geojson, {
            onEachFeature: (feature, layer) => {
                layer.on("click", () => {
                    console.log(`Clicked on ${feature.properties.description}`);
                });
            }
        }).addTo(map);
    });
}

async function findImageSet(apiUrl, searchId) {
    try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error(`API error: ${response.statusTexr}`);
        }

        const data = await response.json();
        const photos = data.photos; 

        // array list holding file paths 
        let photosPaths = [];

        for (const [point, pointData] of Object.entries(photos)) {
            if (point.match(searchId.split("_", 1)[0])) {
                if (pointData.files && Array.isArray(pointData.files)) {
                    pointData.files.forEach((photo) => {
                        photosPaths.push('http://localhost:3000/photos/' + photo);
                    }
                );}
                break;
            } 
        }
        return photosPaths 
    } catch (error) {
        console.error('Error fetching file: ', error);
        return null 
    }
}

async function getImages(apiUrl, imageSet) {
    try {
        const response = await fetch(apiUrl + imageSet);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayImages(data);
    } catch (error) {
        console.error('Error fetching file list: ', error);
    }
}

async function displayImages(images) {
    console.log(images);

    clearGallery();

    if (images.length > 0) {

        let plural = "";
        if (images.length == 1) {
            plural = "photo";
        } else {
            plural = "photos";
        }
        document.getElementById("num-photos").innerText = `${images.length} ${plural} available for this location: `;

        // new code to display images gallery-style (using viewer.js 
        images.forEach((imageUrl) => {
            const img = document.createElement('img');
            img.src = imageUrl;
            gallery.appendChild(img);
        });

        const imgs = document.querySelectorAll("#gallery img");
        imgs.forEach((ph, i) => {
            ph.style.animationDelay = `${i * 200}ms`; // staggered effect
        });

        setTimeout(() => {
            initializeViewer();
        }, 100);
    } else {
        document.getElementById("num-photos").innerText = "";
        gallery.innerHTML = /*html*/ `<p style="font-style: none; font-size: 20px;">Sorry, this location does not have any photos available.</p>`;
    }
}

function initializeViewer() {
    // destroy existing viewer instance if it exists 
    if (viewer) {
        viewer.destroy();
    }

    // initialize viewer.js on next set of images 
    viewer = new Viewer(gallery, {
        inline: false,
        toolbar: {
            zoomIn: 1,
            zoomOut: 1,
            oneToOne: 1,
            reset: 1,
            prev: 1,
            play: 0,
            next: 1,
            rotateLeft: 1,
            rotateRight: 1,
            flipHorizontal: 1,
            flipVertical: 1,
        }
    });
}

function clearGallery() {
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
}