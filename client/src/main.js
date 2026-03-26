// libraries, extensions, plugins
import L from 'leaflet';
import Viewer from 'viewerjs';

// styles
import 'viewerjs/dist/viewer.css';
import 'leaflet/dist/leaflet.css';


/* ------------------------------------------------------------
initialize app 
------------------------------------------------------------ */


let app = document.getElementById("app");

app.innerHTML = /*html*/ `
<h1>Test map with sample images</h1>
<div id="map"></div>

<!-- modal -->
<div class="modal fade" id="results" tabindex="-1" data-bs-backdrop="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="point-clicked"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p id="num-photos"></p>
                <div id="gallery"></div>
                <p id="text-description"></p>        
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" title="Back to map view">Close</button>
            </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="tutorial" tabindex="-1" data-bs-backdrop="true">
    <div class="modal-dialog modal-dialog-centered  modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="">Welcome to the Geology Photo Gallery!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            How to use<br>
            To view available field photos for a site, please click on a map feature (e.g., polygon, point).<br>
            Brought to you by the GHS Information Management Team at WERI-UOG.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" title="Back to map view">Close</button>
            </div>
            </div>
        </div>
    </div>
</div>

<!-- dock -->
<div class="dock-wrapper">
<div class="dock" id="dock-control">
    <button id="toggle-layer">
        <i data-lucide="layers"></i>
        <span class="dock-icon-tooltip">Toggle Layer</span>
    </button>
    <button id="zoom-in">
        <i data-lucide="zoom-in"></i>
        <span class="dock-icon-tooltip">Zoom In</span>
    </button>
    <button id="zoom-out">
        <i data-lucide="zoom-out"></i>
        <span class="dock-icon-tooltip">Zoom Out</span>
    </button>
    <button id="recenter">
        <i data-lucide="rotate-ccw"></i>
        <span class="dock-icon-tooltip">Recenter Map</span>
    </button>
    <button id="locate">
        <i data-lucide="crosshair"></i>
        <span class="dock-icon-tooltip">Find My Location</span>
    </button>
    <div class="btn-group dropup">
        <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i data-lucide="layers"></i>
            <span class="dock-icon-tooltip">Toggle Layer</span>
        </button>
        <ul class="dropdown-menu">
            <li><h6 class="dropdown-header">Base Layers</h6></li>
            <li class="form-check">
                <input class="form-check-input" type="radio" name="radioOptions" id="radio1">
                <label class="form-check-label" for="radio1">Open Street Map</label>
            </li>
            <li class="form-check">
                <input class="form-check-input" type="radio" name="radioOptions" id="radio1">
                <label class="form-check-label" for="radio1">ESRI World Imagery</label>
            </li>
            <!-- <li><a class="dropdown-item" href="#">Menu item</a></li> -->
            <li><hr class="dropdown-divider" style="border-color: #677077;"></li>
            <li><h6 class="dropdown-header">Villages</h6></li>
            <li class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox1">
                <label class="form-check-label" for="checkbox1">North</label>
            </li>
            <li class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox1">
                <label class="form-check-label" for="checkbox1">South</label>
            </li>
        </ul>
    </div>
</div>
</div>
`;


/* ------------------------------------------------------------
initialize leaflet map 
------------------------------------------------------------ */


const center = [13.4443, 144.7937];
const defaultZoom = 12;

// initialize map
const map = L.map('map', {
    center: center,
    zoom: defaultZoom,
    zoomControl: false,
});

// open street map
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        className: 'fade-layer',
    });

// esri imagery map 
const ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        className: 'fade-layer',
    }); 

// use osm as default map tiles 
osm.addTo(map);

let currentLayer = 'osm';


/* ------------------------------------------------------------
modal handling for short tutorial
------------------------------------------------------------ */

const tutorialElement = document.getElementById("tutorial");
const tutorialModal = new bootstrap.Modal(tutorialElement);

// show modal 
tutorialModal.show();

// auto-hide after some seconds 
setTimeout(() => {
    tutorialModal.hide();
}, 4000);


/* ------------------------------------------------------------
modal handling for photo gallery 
------------------------------------------------------------ */


// modal body 
const gallery = document.getElementById('gallery'); 

// modal element instance 
const modalElement = document.getElementById('results');
const modalDialog = new bootstrap.Modal(modalElement);

const dock = document.getElementById('dock-control');

// hide and show dock based on visibility of modal
if (!dock || !modalElement) {
    console.error('Dock or modal not found');
} else {
    modalElement.addEventListener('show.bs.modal', () => {
        dock.classList.add('hidden');
    });

    modalElement.addEventListener('hidden.bs.modal', () => {
        dock.classList.remove('hidden');
    });
}

// for photo lightbox
let viewer;

lucide.createIcons();


/* ------------------------------------------------------------
event listeners for dock buttons 
------------------------------------------------------------ */


document.getElementById('toggle-layer').addEventListener('click', () => { 
    if (currentLayer === 'osm') {
        map.removeLayer(osm);
        ewi.addTo(map);
        currentLayer = 'ewi';
    } else {
        map.removeLayer(ewi);
        osm.addTo(map);
        currentLayer = 'osm';
    }
});

document.getElementById('zoom-in').addEventListener('click', () => {
    map.zoomIn();
});

document.getElementById('zoom-out').addEventListener('click', () => {
    map.zoomOut();
});

document.getElementById('recenter').addEventListener('click', () => {
    map.setView(center, defaultZoom);
});

document.getElementById('locate').addEventListener('click', () => {
    alert('Clicked on locate');
});

document.addEventListener('keydown', (pressed) => {
    if (pressed.key === "Escape") {
        if (viewer && viewer.isShown) {
            pressed.preventDefault();
            pressed.stopPropagation(); // prevent boostrap from noticing this event 
            pressed.stopImmediatePropagation(); 
            viewer.hide(); // close the viewer only 
        }
    }
}, true);

getLayers("./src/data/points.json")
getLayers("./src/data/polygons.json")


/* ------------------------------------------------------------
functions for leaflet map layers, image retrieval   
------------------------------------------------------------ */


function getLayers(data) {
    fetch(data) 
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: (feature, layer) => {
                layer.on('click', async () => {
                    console.log(`Clicked on ${feature.properties.description} with ID ${feature.properties.id}`);
                    findImagesSet_v2('/api/photos/', feature.properties.name).then(images => {

                        document.getElementById("point-clicked").innerText = `${feature.properties.description}`;

                        if (images.paths != null) {
                            displayImages_v3(images.paths);
                        } else {
                            console.log(`Sorry, could not find images :-(`);
                        }

                        modalDialog.show();
                    });
                    // getImageDescription_v2(feature.properties.id);
                });
            }
        }).addTo(map);
    });
}

// for polygons (to implement for points as well)
async function findImagesSet_v2(apiUrl, searchId) {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        const photos = data.photos;

        let imageList = {
            paths: [],
            description: "",
        }

        for (const [point, pointData] of Object.entries(photos)) {
            if (point.match(searchId.split("_", 1)[0])) {
                if (pointData.images && Array.isArray(pointData.images)) {
                    pointData.images.forEach((photo) => {
                        imageList.paths.push('/photos/' + photo);
                    });
                }
                break;
            }
        }

        console.log(imageList);

        return imageList;
    } catch (error) {
        console.error('Error fetching file: ', error);
        return null;
    }
}

async function getImageDescription_v2(loc) {
    try {
        const response = await fetch('/descriptions');
        
        if (!response.ok) {
            throw new Error(`Descriptions API error: ${response.statusText}`);
        }

        const data = await response.json();
        const descriptions = data;

        for (let i = 0; i < descriptions.length; i++) {
            if (descriptions[i].id === loc) {
                document.getElementById("text-description").innerText = `${descriptions[i].text}`;
                break;
            } else {
                document.getElementById("text-description").innerText = '';
            }
        }
    } catch (error) {
        console.error('Error retrieving photo descriptions: ', error);
    }
}

async function displayImages_v3(images) {
    clearGallery();

    if (images.length > 0) {

        let plural = "";
        if (images.length == 1) {
            plural = "photo";
        } else {
            plural = "photos";
        }
        document.getElementById("num-photos").innerText = `${images.length} ${plural} available for this location: `;

        let loadedImgs = [];
        let imgsLoaded = 0;

        // new code to display images gallery-style (using viewer.js
        images.forEach((imageUrl) => {
            const img = new Image();
            img.src = imageUrl;
            // gallery.appendChild(img);

            img.onload = function() {
                imgsLoaded++;
                if (imgsLoaded === images.length) {
                    displayImages_v3_sub(loadedImgs);
                }
            };
            loadedImgs.push(img);
        });
    } else {
        document.getElementById("num-photos").innerText = "";
        gallery.innerHTML = /*html*/ `<p style="font-style: none; font-size: 20px;">Sorry, this location does not have any photos available.</p>`;
    }
}

function displayImages_v3_sub(images) {
    images.forEach((img, index) => {
        img.classList.add("gallery-img");

        setTimeout(() => {
            img.classList.add("loaded"); // apply animation class
            initializeViewer();
        }, index * 300); // staggered animation effect

        gallery.append(img);
    });
}


/* ------------------------------------------------------------
functions to create gallery viewer and reset 
------------------------------------------------------------ */


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
