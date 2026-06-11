// libraries, extensions, plugins
import L from 'leaflet';
import Viewer from 'viewerjs';

// styles
import 'viewerjs/dist/viewer.css';
import 'leaflet/dist/leaflet.css';

// components 
import { Legend } from './components/Legend.js';

/* ------------------------------------------------------------
adjust header
------------------------------------------------------------ */

// let header = document.querySelector("header");

// header.innerHTML = /*html*/ `
// <h1>Geology Photo Gallery</h1>
// <span>// WERI MAppFx | Guam Hydrologic Survey</span>
// `;


/* ------------------------------------------------------------
initialize app 
------------------------------------------------------------ */


let app = document.getElementById("app");

app.innerHTML = /*html*/ `
<div id="map"></div>

<!-- photo gallery modal -->
<div class="modal fade" id="results" tabindex="-1" data-bs-backdrop="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="point-clicked"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p id="text-description"></p>
                <p id="num-photos"></p>
                <div id="gallery"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" title="Back to map view">Close</button>
            </div>
            </div>
        </div>
    </div>
</div>

<!-- tutorial modal  -->
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

<!-- legend offcanvas -->
<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="legend-offcanvas" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <p>Try scrolling the rest of the page to see this option in action.</p>
    </div>
</div>

<!-- dock -->
<div class="dock-wrapper">
<div class="dock" id="dock-control">
    <button id="toggle-legend" data-bs-toggle="offcanvas" data-bs-target="legend-offcanvas" aria-controls="offcanvasScrolling">
        <i data-lucide="list"></i>
        <span class="dock-icon-tooltip">Legend</span>
    </button>
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

// esri world topo map 
const ewtm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        className: 'fade-layer',
    });

// esri world gray canvas map 
const ewgc = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        className: 'fade-layer',
    });

// use osm as default map tiles 
// osm.addTo(map);
ewtm.addTo(map);

let currentLayer = 'ewtm';


/* ------------------------------------------------------------
leaflet marker icon adjustment 
------------------------------------------------------------ */


// fix marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});


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
offcanvas handling for legend
------------------------------------------------------------ */

// event listener for legend on dock 
const legend_btn = document.getElementById("toggle-legend");

legend_btn.addEventListener("click", () => {
    console.log("Clicked on legend-offcanvas button")
});

const legend_offcanvas = document.getElementById("legend-offcanvas");




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
    if (currentLayer === 'ewtm') {
        map.removeLayer(ewtm);
        ewi.addTo(map);
        currentLayer = 'ewi';
    } else {
        map.removeLayer(ewi);
        ewtm.addTo(map);
        currentLayer = 'ewtm';
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

// demo purposes 
// getLayers("/data/points.json")
// getLayers("/data/polygons.json")

// official layers
getLayers("/data/GeoGalGMG2026.json", 1);
getLayers("/data/GeoGalGMGBndry2026.json", 2);
getLayers("/data/GeoGalPoints2026.json", 3);


/* ------------------------------------------------------------
functions for styling map features (e.g., points, polygons, lines)
------------------------------------------------------------ */


// temporary function to set the point color
function getColor(code) {
    switch(code) {
        case 0:
            return "#000";
        case 1:
            return "#fff";
        case 2:
            return "#AA4A44";
        case 3:
            return "#FFDE21";
        case 4:
            return "#50C878";
        default:
            return "#708090";
    }
}

// style the line type
function getLineType(code) {
    if (code != 1) {
        return null;
    } else {
        return "5, 5";
    }
}

// style the line color 
function getLineColor(code) {
    if (code === 0 | code === 1) {
        return "#000"
    } else {
        return "#62d4f4";
    }
}


/* ------------------------------------------------------------
leaflet pattern fill rendering 
------------------------------------------------------------ */


// const renderer = L.svg().addTo(map);

// define patterns - each have a different id 
const pattern_defs = /*html*/`
<!-- blue stripes with SID 17 (label: QTma, description: Mariana, Hagåtña argillacous member -->
<pattern id="" x="0" y="0" width ="14", height="14" patternUnits="userSpaceOnUse"
         patternTransform="rotate(45)">
    <rect width="14" height="14" fill="#ffffff"/>
    <line x1="0" y1="0" x2="0" y2="14" stroke="#ade9ff" stroke-width="8"/>
</pattern>

<!-- beige strips with SID 4 (label: Tt, description: Talisay) -->
<pattern id=""x="0" y="0" width="7" height="7"
         patternUnits="userSpaceOnUse"
         patternTransform="rotate(45)">
    <rect width="7" height="7" fill="#ffffff"/>
    <line x1="0" y1="0" x2="0" y2="7" stroke="#bcaf9f" stroke-width="1.5"/>
</pattern>

<!-- magenta stripes with SID 9 (label: Tu, description: Umatac formation undifferentiated) -->
<pattern id="" x="0" y="0" width="14" height="14"
         patternUnits="userSpaceOnUse">
    <rect width="14" height="14" fill="#c77bb2"/>
    <circle cx="7" cy="7" r="3" fill="#ffffff"/>
</pattern>
`;

// inject defs into leaflet's overlay svg 
function injectDefs() {
    const svg = document.querySelector(".leaflet-overlay-pane svg");

    if (!svg) return;

    let defs = svg.querySelector("defs");

    if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        svg.insertBefore(defs, svg.firstChild)
    }

    defs.innerHTML = pattern_defs;
}

map.on("layeradd zoomend moveend viewresetr", injectDefs);

// style function 
function addPatternStyle(feature) {
    const id = feature.properties.SID;
    const pattern = Object.prototype.hasOwnProperty.call(id);

    return {
        fillColor: ``,
        fillOpacity: 1,
        color: ``,
        opacity: 1,
        weight: 2
    };
}


/* ------------------------------------------------------------
functions for leaflet map layers, image retrieval   
------------------------------------------------------------ */


// params: data (url to geojson), ftype (feature type: 1 = polygon, 2 = boundary, 3 = point)
function getLayers(data, ftype) {
    fetch(data) 
    .then(response => response.json())
    .then(data => {

        // polygons 
        if (ftype === 1) {
            let polygons = L.geoJSON(data, {
                // style polygons and lines 
                style: (feature) => {
                    if (feature.geometry.type === "Polygon" | feature.geometry.type === "MultiPolygon") { 
                        return {
                            color: `#${feature.properties.Hex}`,
                            weight: 2,
                            fillColor: `#${feature.properties.Hex}`,
                            fillOpacity: 1
                        };
                    }
                },
                // set onclick events for each feature based on geometry type (e.g., point, polygon) and display available images in modal
                onEachFeature: (feature, layer) => {
                    if (feature.geometry.type === "MultiPolygon" | feature.geometry.type === "Polygon") { 
                        layer.on('click', async () => {
                            // TODO - check JSON properties (get list of keys)
                            findImagesSet_v2('/api/photos/', feature.properties.GID).then(images => {
                                document.getElementById("point-clicked").innerText = `${feature.properties.MapUnit}`;
                                document.getElementById("text-description").innerText = images.description || '';

                                if (images.paths != null) {
                                    displayImages_v3(images.paths);
                                } else {
                                    console.log(`Sorry, could not find images :-(`);
                                }

                                modalDialog.show();
                            });
                            // getImageDescription_v2(feature.properties.id);
                            // getImageDescription_v2(feature.properties.PID);
                        });
                    } 
                }
            }).addTo(map);
    //         polygons.bringToBack();

    //         const svg = map.getPanes().overlayPane.querySelector("svg");

    //         svg.insertAdjacentHTML("afterbegin",
    //             `
    //             <pattern id="diagonalStripes" patternUnits="userSpaceOnUse"
    //   width="12" height="12" patternTransform="rotate(45)">
    //   <rect width="12" height="12" fill="#d9edf7"/>
    //   <line x1="0" y1="0" x2="0" y2="12"
    //     stroke="#0077b6" stroke-width="4"/>
    // </pattern>
    //             `
    //         );

    //         console.log("Added pattern")

        // boundaries
        } else if (ftype === 2) {
            L.geoJSON(data, {
                // style polygons and lines 
                style: (feature) => {
                    if (feature.geometry.type === "LineString" | feature.geometry.type === "MultiLineString") {
                        return {
                            color: getLineColor(feature.properties.Code1),
                            weight: 2, 
                            dashArray: getLineType(feature.properties.Code1),
                        }
                    }
                }
            }).addTo(map);
        
        // points 
        } else if (ftype === 3) {
            let points = L.geoJSON(data, {
                // style points 
                pointToLayer: (feature, latlng) => {
                    return L.circleMarker(latlng, {
                        radius: 8, 
                        fillColor: getColor(feature.properties.SCode),
                        color: "#000",
                        weight: 2,
                        fillOpacity: 1
                    });
                },
                // set onclick events for each feature based on geometry type (e.g., point, polygon) and display available images in modal
                onEachFeature: (feature, layer) => {
                    if (feature.geometry.type === "Point") {
                        layer.on('click', async () => {
                            // TODO - check JSON properties (get list of keys)
                            findImagesSet_v2('/api/photos/', feature.properties.PID).then(images => {
                                document.getElementById("point-clicked").innerText = `${feature.properties.Place}`;
                                document.getElementById("text-description").innerText = images.description || '';

                                if (images.paths != null) {
                                    displayImages_v3(images.paths);
                                } else {
                                    console.log(`Sorry, could not find images :-(`);
                                }

                                modalDialog.show();
                            });
                            // getImageDescription_v2(feature.properties.id);
                            // getImageDescription_v2(feature.properties.PID);
                        });
                    } 
                }
            }).addTo(map);
            points.bringToFront();
        }
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
        // console.log(data);
        const photos = data.photos;

        let imageList = {
            paths: [],
            description: "",
        }

        for (const [point, pointData] of Object.entries(photos)) {
            console.log(`Checking point ${point} against search ID ${searchId}`);
            if (point.match(searchId.split("_", 1)[0])) {
                if (pointData.images && Array.isArray(pointData.images)) {
                    pointData.images.forEach((photo) => {
                        imageList.paths.push('/photos/' + photo);
                    });
                }
                imageList.description = pointData.description || "";
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