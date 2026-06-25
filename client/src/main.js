// libraries, extensions, plugins
import L from 'leaflet';
import Viewer from 'viewerjs';

// styles
import 'viewerjs/dist/viewer.css';
import 'leaflet/dist/leaflet.css';

// import "leaflet.locatecontrol"; // Import plugin
// import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"; // Import styles

// components 
// import { Legend } from './components/Legend.js';
import { NavBar } from './components/NavBar.js';
import { About } from './components/About.js';

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


// const header = document.createElement("header");

// header.innerHTML = /*html*/ `
// <div class="branding" id="">MAppFx: Geology Photo Gallery</div>
// <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
//   <button type="button" class="btn btn-primary">1</button>
//   <button type="button" class="btn btn-primary">2</button>

//   <div class="btn-group" role="group">
//     <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//       Dropdown
//     </button>
//     <ul class="dropdown-menu">
//       <li><a class="dropdown-item" href="#">Dropdown link</a></li>
//       <li><a class="dropdown-item" href="#">Dropdown link</a></li>
//     </ul>
//   </div>
// </div>
// `;

const app = document.getElementById("app");

// app.insertAdjacentElement("beforebegin", header);

app.innerHTML = /*html*/ `
<div id="nav-bar"></div>
<div id="about-modal"></div>
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
            <p class="text-bold-weight">How to use:</p>
            <p>To view available field photos for a site, please click on a map feature (e.g., polygon or point).</p>
            <p class="text-italicize">Brought to you by the GHS Information Management Team at WERI-UOG.</p>
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
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Legend</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body" id="legend-contents">
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
initialize other components: about, navbar, legend
------------------------------------------------------------ */
NavBar(document.getElementById("nav-bar"));
// Legend(document.getElementById("legend-offcanvas"));
About(document.getElementById("about-modal"));
LegendContents("/data/GeologicUnits.json");
// LegendContents("/data/GeoGalGMG2026.json");


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
display/hide leaflet tooltip based on zoom level
------------------------------------------------------------ */

// map.on("zoomend", function(z) {
//     let zoomLevel = map.getZoom();
//     toggleTooltips(zoomLevel);
// });

// function toggleTooltips(z) {
//     if (z >= 15 ){
//             [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
//                 t.style.visibility = 'visible';
//             });
//         } else {
//             [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
//                 t.style.visibility = 'hidden';
//             });
//         }
// }


/* ------------------------------------------------------------
modal handling for short tutorial
------------------------------------------------------------ */


const tutorialElement = document.getElementById("tutorial");
const tutorialModal = new bootstrap.Modal(tutorialElement);

// // show modal 
// tutorialModal.show();

// // auto-hide after some seconds 
// setTimeout(() => {
//     tutorialModal.hide();
// }, 4000);


/* ------------------------------------------------------------
offcanvas handling for legend
------------------------------------------------------------ */

// // event listener for legend on dock 
// const legend_btn = document.getElementById("toggle-legend");

// legend_btn.addEventListener("click", () => {
//     console.log("Clicked on legend-offcanvas button")
// });

// const legend_offcanvas = document.getElementById("legend-offcanvas");




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
enforce layer orders 
------------------------------------------------------------ */

// create panes for each feature 
map.createPane('polygonPane');
map.createPane('linePane');
map.createPane('pointPane')

// assign z-index values
map.getPane('polygonPane').style.zIndex = 300;
map.getPane('linePane').style.zIndex = 350;
map.getPane('pointPane').style.zIndex = 399; // keep below 400, so tooltips & popups still work 


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
        return "15, 15";
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

const patterned_polygons = new Set([4, 9, 17]);

// define patterns - each have a different id 
const pattern_defs = /*html*/`
<!-- blue stripes with SID 17 (label: QTma, description: Mariana, Hagåtña argillacous member -->
<pattern id="pat-17" x="0" y="0" width ="14" height="14" patternUnits="userSpaceOnUse"
         patternTransform="rotate(315)">
    <rect width="14" height="14" fill="#ade9ff"/>
    <line x1="0" y1="0" x2="0" y2="14" stroke="#fff" stroke-width="4"/>
</pattern>

<!-- beige strips with SID 4 (label: Tt, description: Talisay) -->
<pattern id="pat-4" x="0" y="0" width="12" height="12"
         patternUnits="userSpaceOnUse"
         patternTransform="rotate(45)">
    <rect width="12" height="12" fill="#bcaf9f"/>
    <line x1="0" y1="0" x2="0" y2="12" stroke="#fff" stroke-width="1.5"/>
</pattern>

<!-- magenta stripes with SID 9 (label: Tu, description: Umatac formation undifferentiated) -->
<pattern id="pat-9" x="0" y="0" width="56" height="56"
         patternUnits="userSpaceOnUse">
    <rect width="56" height="56" fill="#c77bb2"/>
    <circle cx="7" cy="12" r="3" fill="#ffffff"/>
    <circle cx="23" cy="4" r="3" fill="#ffffff"/>
    <circle cx="41" cy="9" r="3" fill="#ffffff"/>
    <circle cx="52" cy="21" r="3" fill="#ffffff"/>
    <circle cx="14" cy="28" r="3" fill="#ffffff"/>
    <circle cx="33" cy="31" r="3" fill="#ffffff"/>
    <circle cx="48" cy="40" r="3" fill="#ffffff"/>
    <circle cx="5" cy="44" r="3" fill="#ffffff"/>
    <circle cx="19" cy="51" r="3" fill="#ffffff"/>
    <circle cx="38" cy="49" r="3" fill="#ffffff"/>
    <circle cx="27" cy="18" r="3" fill="#ffffff"/>
</pattern>
`;

// inject defs into leaflet's overlay svg 
function injectDefs() {
    const svg = document.querySelector(".leaflet-polygon-pane svg");

    if (!svg) {
        console.log('injectDefs: SVG not found yet');
        return;
    }

    let defs = svg.querySelector("defs");

    if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        svg.insertBefore(defs, svg.firstChild)
    }

    defs.innerHTML = pattern_defs;

    // confirm function run
    console.log("Ran injectDefs");
}

map.on("layeradd zoomend moveend viewreset", injectDefs);

// style function 
function addPatternStyle(feature) {
    // const id = feature.properties.SID;
    // const pattern = Object.prototype.hasOwnProperty.call(id);
    const patterned_polygons = new Set([4, 9, 17]);

    if (patterned_polygons.has(feature.properties.SID)) {
        return {
            weight: 1,
            color: `#${feature.properties.Hex}`,
            opacity: 1,
            fillColor: `url-(#pat-${feature.properties.SID})`,
            fillOpacity: 1
        }
    } else {
        return {
            weight: 1,
            color: `#${feature.properties.Hex}`,
            opacity: 1,
            fillColor: `#${feature.properties.Hex}`,
            fillOpacity: 1
        }
    }
}

function darkenHex(hexcode) {
    const amount = 0.4;
    const num = parseInt(hexcode, 16);
    const r = Math.max(0, (num >> 16) - Math.round(255 * amount));
    const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * amount));
    const b = Math.max(0, (num & 0xff) - Math.round(255 * amount));

    const darkerHexcode = "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");

    // console.log(`Original hex: ${hexcode} | Num: ${num} | Darker hex: ${darkerHexcode}`);
    return darkerHexcode;
}


/* ------------------------------------------------------------
layer groups for polygons
------------------------------------------------------------ */

const legendLayers = {
    polygonLayers: {
        poly1_Tf:   L.featureGroup(),
        poly2_Ta:   L.featureGroup(),
        poly3_Tam:  L.featureGroup(),
        poly4_Tt:   L.featureGroup(),
        poly5_Tug:  L.featureGroup(),
        poly6_Tus:  L.featureGroup(),
        poly7_Tub:  L.featureGroup(),
        poly8_Tud:  L.featureGroup(),
        poly9_Tu:   L.featureGroup(),
        poly10_Tm:  L.featureGroup(),
        poly11_Tb:  L.featureGroup(),
        poly12_Tbl: L.featureGroup(),
        poly13_Tj:  L.featureGroup(),
        poly14_Tal: L.featureGroup(),
        poly15_QTmp: L.featureGroup(),
        poly16_QTmh: L.featureGroup(),
        poly17_QTma: L.featureGroup(),
        poly18_QTmf: L.featureGroup(),
        poly19_QTmm: L.featureGroup(),
        poly20_QTmd: L.featureGroup(),
        poly21_QTmr: L.featureGroup(),
        poly22_Qt:  L.featureGroup(),
        poly23_Qal: L.featureGroup(),
        poly24_Qrm: L.featureGroup(),
        poly25_Qrb: L.featureGroup(),
        poly26_Qaf: L.featureGroup()
    },
    pointLayers: {
        point1: L.featureGroup(),
        point2: L.featureGroup(),
        point3: L.featureGroup(),
        point4: L.featureGroup(),
        point5: L.featureGroup()
    },
    boundaryLayers: {
        boundary1: L.featureGroup(),
        boundary2: L.featureGroup(),
        boundary3: L.featureGroup()
    }
};


/* ------------------------------------------------------------
functions for leaflet map layers, image retrieval   
------------------------------------------------------------ */


const polygonLayers = {};
const boundaryLayers = {};
const pointLayers = {};

// params: data (url to geojson), ftype (feature type: 1 = polygon, 2 = boundary, 3 = point)
function getLayers(data, ftype) {
    fetch(data) 
    .then(response => response.json())
    .then(data => {

        // polygons 
        if (ftype === 1) {
            data.features.forEach(feature => {
                const id = feature.properties.SID;
                const name = feature.properties.UnitAbr;

                const polyLayer = L.geoJSON(feature, {
                    pane: 'polygonPane',
                    // style polygons and lines 
                    style: (feature) => {
                        if (patterned_polygons.has(Number(feature.properties.SID))) {
                                console.log(feature.properties.SID);
                                return {
                                    weight: 1,
                                    color: `#${feature.properties.Hex}`,
                                    opacity: 1,
                                    fillColor: `url(#pat-${Number(feature.properties.SID)})`,
                                    fillOpacity: 1
                                }
                            } else {
                                return {
                                    weight: 1,
                                    color: `#${feature.properties.Hex}`,
                                    opacity: 1,
                                    fillColor: `#${feature.properties.Hex}`,
                                    fillOpacity: 1
                                }
                            } // end of pattern style conditional 
                    },
                    // set onclick events for each feature based on geometry type (e.g., point, polygon) and display available images in modal
                    onEachFeature: (feature, layer) => {
                        layer.bindPopup(`
                            <p class="text-bold-weight">${feature.properties.UnitAbr}</p>
                            <p>${feature.properties.MapUnit}</p>
                            <p>Formation: ${feature.properties.Formation}</p>
                            <p>Epoch: ${feature.properties.Epoch}</p>
                            `);

                        // layer click event
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

                        layer.on({
                            mouseover(e) {
                                e.target.setStyle({ 
                                    weight: 4, 
                                    color: `${darkenHex(feature.properties.Hex)}`,
                                    // fillColor: `${darkenHex(feature.properties.Hex)}`,
                                });

                                layer.bringToFront();
                                console.log(feature.properties.UnitAbr)
                            },
                            mouseout(e) {
                                polyLayer.resetStyle(e.target);
                            }
                        });
                    }
                });

                polygonLayers[id] = polyLayer;
                polyLayer.addTo(map);
                injectDefs();
            }); // end of forEach loop 

        // boundaries
        } else if (ftype === 2) {
            data.features.forEach(feature => { 
                const id = feature.properties.Code1;
                const bLayer = L.geoJSON(data, {
                    pane: 'linePane',
                    // style polygons and lines 
                    style: (feature) => {
                        return {
                                color: getLineColor(feature.properties.Code1),
                                weight: 1, 
                                dashArray: getLineType(feature.properties.Code1),
                            }
                    }
                });

                boundaryLayers[id] = bLayer;
                bLayer.addTo(map);

            }); // end of forEach loop
        
        // points 
        } else if (ftype === 3) {

            const sinkhole = L.icon({
                iconUrl: "/assets/geo-gallery-icon-sinkhole.svg",
                iconSize: [40, 40]
            });

            const cave = L.icon({
                iconUrl: "/assets/geo-gallery-icon-cave.svg",
                iconSize: [40, 40]
            });

            const customIcons = [0, 1, 3]

            data.features.forEach(feature => { 
                const id = feature.properties.SCode;
                const ptLayer = L.geoJSON(data, {
                    pane: 'pointPane',
                    // style points 
                    pointToLayer: (feature, latlng) => {
                        switch (id) {
                            case 0:
                                return L.circleMarker(latlng, {
                                    radius: 8, 
                                    fillColor: getColor(feature.properties.SCode),
                                    color: "#000",
                                    weight: 2,
                                    fillOpacity: 1,
                                    pane: 'pointPane'
                                });
                            case 1:
                                return L.circleMarker(latlng, {
                                    radius: 8, 
                                    fillColor: getColor(feature.properties.SCode),
                                    color: "#000",
                                    weight: 2,
                                    fillOpacity: 1,
                                    pane: 'pointPane'
                                });
                            case 2:
                                // console.log("Sinkhole")
                                // return L.marker(latlng, { 
                                //     icon: sinkhole, pane: 'pointPane' });
                                console.log("Aerial")
                                return L.circleMarker(latlng, {
                                    radius: 8, 
                                    fillColor: getColor(feature.properties.SCode),
                                    color: "#000",
                                    weight: 2,
                                    fillOpacity: 1,
                                    pane: 'pointPane'
                                });
                            case 3:
                                // console.log("Aerial")
                                // return L.circleMarker(latlng, {
                                //     radius: 8, 
                                //     fillColor: getColor(feature.properties.SCode),
                                //     color: "#000",
                                //     weight: 2,
                                //     fillOpacity: 1,
                                //     pane: 'pointPane'
                                // });
                                console.log("Sinkhole")
                                return L.marker(latlng, { 
                                    icon: sinkhole, pane: 'pointPane' });
                            case 4:
                                console.log("Cave")
                                return L.marker(latlng, { 
                                    icon: cave, pane: 'pointPane' });
                        }
                    },
                    // set onclick events for each feature based on geometry type (e.g., point, polygon) and display available images in modal
                    onEachFeature: (feature, layer) => {
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
                });

                pointLayers[id] = ptLayer;
                ptLayer.addTo(map);
                ptLayer.bringToFront();

            }); // end of forEach loop
        } // end of conditional for point 
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


/* ------------------------------------------------------------
functions to create gallery viewer and reset 
------------------------------------------------------------ */


function LegendContents(data) {

    let legend = document.getElementById("legend-contents");

    const legend_tabs = `
    <ul class="nav nav-tabs" id="legend_tabs">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#panel-one">Geologic Map</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#panel-two">Points</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#panel-three">Boundaries</a>
        </li>
    </ul>`;

    const legend_tabs_content = `
    <div class="tab-content mt-3">
        <div class="tab-pane fade show active" id="panel-one">Content for Geologic Map</div>
        <div class="tab-pane fade" id="panel-two">Content for Points</div>
        <div class="tab-pane fade" id="panel-three">Content for Boundaries</div>
    </div>`;

    legend.innerHTML = legend_tabs + legend_tabs_content;

    const polygon_tab = document.getElementById("panel-one");
    const point_tab = document.getElementById("panel-two");
    const boundaries_tab = document.getElementById("panel-three");

    fetch(data) 
    .then(response => response.json())
    .then(contents => { 
        console.log(contents);
        // console.log(contents.geologic_units.length)
        const geologic_units = contents.units;

        // console.log(contents.features.length);
        // const geologic_units = contents.features;
        // console.log(geologic_units[0].properties.Label1);

        const HEIGHT = 40;
        const WIDTH = 40;

        let legend_row;

        for (let i = 0; i < geologic_units.length; i++) {
            if (patterned_polygons.has(geologic_units.number)) {
                switch (geologic_units.number) {
                    case 4:
                        legend_row = `
                        <div class="legend-row">
                            <div class="legend-toggle">
                                <div class="legend-swatch">
                                    <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="swatch-pat-4" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                                <rect width="12" height="12" fill="#${geologic_units[i].hexcode}"/>
                                                <line x1="0" y1="0" x2="0" y2="12" stroke="#fff" stroke-width="1.5"/>
                                            </pattern>
                                        </defs>
                                        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#swatch-pat-4)" />
                                    </svg>
                                </div>
                                <div class="legend-key">
                                    <p class="legend-label text-bold-weight">${geologic_units[i].label}</p>
                                    <p class="legend-description">${geologic_units[i].description}</p>
                                </div>
                            </div>
                            <input class="form-check-input" type="checkbox" id="toggle-${geologic_units.label}"/>
                        </div>
                        `;
                        break;
                    case 9:
                        legend_row = `
                        <div class="legend-row">
                            <div class="legend-toggle">
                                <div class="legend-swatch">
                                    <svg viewBox="0 0 ${HEIGHT} ${WIDTH}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                        <pattern id="" x="0" y="0" width="56" height="56"  patternUnits="userSpaceOnUse">
                                            <rect width="56" height="56" fill="#c77bb2"/>
                                            <circle cx="7" cy="12" r="3" fill="#ffffff"/>
                                            <circle cx="23" cy="4" r="3" fill="#ffffff"/>
                                            <circle cx="41" cy="9" r="3" fill="#ffffff"/>
                                            <circle cx="52" cy="21" r="3" fill="#ffffff"/>
                                            <circle cx="14" cy="28" r="3" fill="#ffffff"/>
                                            <circle cx="33" cy="31" r="3" fill="#ffffff"/>
                                            <circle cx="48" cy="40" r="3" fill="#ffffff"/>
                                            <circle cx="5" cy="44" r="3" fill="#ffffff"/>
                                            <circle cx="19" cy="51" r="3" fill="#ffffff"/>
                                            <circle cx="38" cy="49" r="3" fill="#ffffff"/>
                                            <circle cx="27" cy="18" r="3" fill="#ffffff"/>
                                        </pattern>
                                        <rect width="${WIDTH}" height="${HEIGHT}" fill="#${geologic_units[i].hexcode}" />
                                    </svg>
                                </div>
                                <div class="legend-key">
                                    <p class="legend-label text-bold-weight">${geologic_units[i].label}</p>
                                    <p class="legend-description">${geologic_units[i].description}</p>
                                </div>
                            </div>
                            <input class="form-check-input" type="checkbox" id="toggle-${geologic_units.label}"/>
                        </div>
                        `;
                        break;
                    case 17:
                        legend_row = `
                        <div class="legend-row">
                            <div class="legend-toggle">
                                <div class="legend-swatch">
                                    <svg viewBox="0 0 ${HEIGHT} ${WIDTH}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                        <pattern id="" x="0" y="0" width ="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(315)">
                                            <rect width="14" height="14" fill="#ade9ff"/>
                                            <line x1="0" y1="0" x2="0" y2="14" stroke="#fff" stroke-width="4"/>
                                        </pattern>
                                        <rect width="${WIDTH}" height="${HEIGHT}" fill="#${geologic_units[i].hexcode}" />
                                    </svg>
                                </div>
                                <div class="legend-key">
                                    <p class="legend-label text-bold-weight">${geologic_units[i].label}</p>
                                    <p class="legend-description">${geologic_units[i].description}</p>
                                </div>
                            </div>
                            <input class="form-check-input" type="checkbox" id="toggle-${geologic_units.label}"/>
                        </div>
                        `;
                        break;
                }
            } else {
                legend_row = `
                <div class="legend-row">
                    <div class="legend-toggle">
                        <div class="legend-swatch">
                            <svg viewBox="0 0 ${HEIGHT} ${WIDTH}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                <rect width="${WIDTH}" height="${HEIGHT}" fill="#${geologic_units[i].hexcode}" />
                            </svg>
                        </div>
                        <div class="legend-key">
                            <p class="legend-label text-bold-weight">${geologic_units[i].label}</p>
                            <p class="legend-description">${geologic_units[i].description}</p>
                        </div>
                    </div>
                    <input class="form-check-input" type="checkbox" id="toggle-${geologic_units[i].label}"/>
                </div>
                `;
            }

            polygon_tab.insertAdjacentHTML("beforeend", legend_row);
        }
    }); // end fetch for geo units

    fetch("/data/PointUnits.json")
    .then(response => response.json())
    .then(contents => {
        console.log(contents);
        const point_units = contents.units;

        const HEIGHT = 40;
        const WIDTH = 40;

        let legend_row;

        for (let i = 0; i < point_units.length; i++) {
            legend_row = `
            <div class="legend-row">
                <div class="legend-toggle">
                    <div class="legend-swatch">
                        <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="340" cy="340" r="180" fill="#${point_units[i].hexcode}" stroke="black" stroke-width="2" vector-effect="non-scaling-stroke"/>
                        </svg>
                    </div>
                    <div class="legend-key">
                        <p class="legend-label text-bold-weight">${point_units[i].label}</p>
                        <p class="legend-description">${point_units[i].description}</p>
                    </div>
                </div>
                <input class="form-check-input" type="checkbox" id="toggle-${point_units[i].label}"/>
            </div>`;

            point_tab.insertAdjacentHTML("beforeend", legend_row);
        }

        const sinkhole = /* html */ `
        <div class="legend-row">
            <div class="legend-toggle">
                <div class="legend-swatch">
                    <svg width="40" height="40" viewBox="1192 230 2017 2017" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" overflow="hidden">
                        <path d="M1210.5 1238.5C1210.5 691.738 1653.74 248.5 2200.5 248.5 2747.26 248.5 3190.5 691.738 3190.5 1238.5 3190.5 1785.26 2747.26 2228.5 2200.5 2228.5 1653.74 2228.5 1210.5 1785.26 1210.5 1238.5Z" stroke="#000000" stroke-width="36.6667" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>
                        <path d="M1210.5 1238.5 3190.5 1238.5" stroke="#000000" stroke-width="36.6667" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>
                        <path d="M2200.5 248.5 2200.5 2228.5" stroke="#000000" stroke-width="36.6667" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>
                        <path d="M1499.96 537.464 2900.04 1937.54" stroke="#000000" stroke-width="36.6667" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>
                        <path d="M2900.03 537.464 1499.96 1937.54" stroke="#000000" stroke-width="36.6667" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>
                        <path d="M1540 1238C1540 873.492 1835.49 578 2200 578 2564.51 578 2860 873.492 2860 1238 2860 1602.51 2564.51 1898 2200 1898 1835.49 1898 1540 1602.51 1540 1238Z" fill="#FFFFFF" fill-rule="evenodd"/>
                    </svg>
                </div>
                <div class="legend-key">
                    <p class="legend-label text-bold-weight">Sinkhole</p>
                    <p class="legend-description"></p>
                </div>
                <input class="form-check-input" type="checkbox" id=""/>
            </div>
        </div>
        `;

        const cave = /* html */ `
        <div class="legend-row">
            <div class="legend-toggle">
                <div class="legend-swatch">
                    <svg width="60" height="40" viewBox="733 243 2884 2012" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden">
  <defs>
    <image width="102" height="266" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAEKBAMAAAASsD3EAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAHR0dHR0dHR0dHR0dHMWV1YAAAAFdFJOUwCAQP+/l1JuJQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAA+xJREFUaN7F2122qjAQBmAmYQG22YBXugBkWADnxP2v6YpWySeZeW0t/1QeTniJSWC0639iI8D8A8wHYM56YmYgAsBYwAyAcYBhVhMDGAKMBczAfNQaBxjWGwMYAsw1Nj68wTjAeMBcCS86QoDpAWMB4wCzxsajzrDeEGB6wNxi40llHGA8YFhvCDD32Fg1aVnAOMB4wNwJayYgAkwPGAsYB5jv2FSTFusNAaYHjH0a+QTkAOMBw3pDgNlik09aFjAOMB4wGxFPQAYw9CbTAya4POJJawCMe5MJuoF4AuL3GHqTCbuBdNKybzIDYMJuIJ2AEOMBw/rzMYCJuoHwuxAb2ZjYAybqBsL59OVugBjhEOL1EXRAbB0QGwERvGyEsVkgAsQM+tiibiBdxSPG62PrgAgMYAiIjYAIesAgaxCrjyC6pIiRrpM9YPhF866uc5A1DjHRaLB8AuYiMgNgoolk8cUTouOuKa7I+8R4gXGJCQmPvrhKTPqUSUxptUOcvo5McYXkGqbUtdPhKF6DTCVDTZMHZ5smD87pzXrGDZMFZ9smC8Flx4nNnJv1ojdNEhxJTBKCAwy3TL4DiUwcgkuNaRufmlPRLGnTounvs2jCEGxmpqZxqTFlM6dNCw2NRROEkD9ntU2TP2cdKmYLjjPjKmZKTic03DIuM2ZtRMnMSdOC9KlmHiFQbmzLDLkZqmaJTycwrmqmuGmBuS0HdozNjambOW5adMFq5hYCcW5swwSfjFtsdbNETduM2zFTF0204xbb2oSqoYIxe2YuP/aiPXP9hAvG7pviTd6waxZbMmt7u6qZ4mVQ8H2qm5kLxuwbLhkCjAXMGtusNA4wrDdGZQ5bbEpz2/WsMxYwDjAeMKw3BJj7npPKWJ05bkOxznjAsN58D0SjxvSAsYBxm7FS45UmWF9ozGP8XhSmD8wgNBYwDjCPW99Dl9w67xjWGwJMrzVzcEkOXXJbXzcOMM/djl3yKKBuWG8IMD1goiq7kZhzcEU6sWG9ocjQrxkLGPeSEU/1Z9Ybjo1oqPoDcwaNaHj7IyMa3l400xuNZEh81YygUZKn+bhcLsq2PZ9KnL7Wd8+7RxjvfWd72BH+rtOcTqeP6+ZzQ2F9wAQmuMO+Jnw7gnt8SqcuNoeCGZ9r/7wA4Stmu8eQm+5xn1WoQw1l80iWPo5is1vlKrTYcaPKVTG71Rrzc6bb3Th7rOyahT4PmKFkRsA0ily2ZPbJeoGysk3r9yKmYFr10fx/Bb5dHy2YZp3PA2bg1kEkpl0itoDpUyMoK5vMtMuj2f9lJKXbufG6tKVFSkll/St5Lamsp0ZSIe4Bg/xv6ne2/8cpWZdGv9OPAAAAAElFTkSuQmCC" preserveAspectRatio="none" id="img0"/>
    <clipPath id="clip1"><rect x="0" y="0" width="648393" height="1457342"/></clipPath>
    <clipPath id="clip2"><rect x="-2770.82" y="-0.181818" width="152400" height="681644"/></clipPath>
    <image width="66" height="134" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAACGBAMAAACbA0F5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAHR0dHR0dHR0dHR0dHMWV1YAAAAEdFJOUwBAgL+jVN0MAAAACXBIWXMAABYlAAAWJQFJUiTwAAACAElEQVRYw+3WYXK0IAwG4Gg9gF/rAeh+HMDpcAA2cv8zVUX0TUDZbftz+bNO5lmQhDASPT2aPv6aU+A24c+EC1G0IJp3ADZsovMY5P15CEnYQ7R7kOgjlMTbHBwBhHUTTThENwc9gCjakmgDiC7IVTgTNtyFCF/pIYmgxTJLt4kxzqfFTFB0BRF4AGFRpBfcx0NiiT0jGi183NaJGKKw52IrQaiJVgoCMEXRVQQbey44JthVRVDCQbQq/FOCnxEWioZlNCVhRKFn0tz6KxE+t44djlCvDsv/sDbphVjfTYj8OK2HoSLGo5Pm0ibBckeH4CRuIKgmuCgm2JKHtlzKGQWDMEJspzx4EFQUkHyWYtwEKdFqwZA4L4WJwoMwmXDrzyFUW/aZmJSIh5YhxFXhi8JDyEgxRWEyQbioW2dqYFYt4uFuxIse4r4KDyL1rhPCgPBK+EyYkmDcnm7+5UIfUOztb2HOwVeFAeGLAtO83yCpLZer4h1T1GuxPPcoqCQwzazFpIWviuOq69TuHxekxV0J+MebyiClxqoJUxWUiVEKzoWRAqdsi8LkohcCFykL8VnYZKUluUhZUC6wtOS4IETMqa/TgjA18UUFgcWnsSTEyr0SLhNUEuMfCHMl7GOir4orENvyD8RUFXwpuofE/Zei+Xe7Xab0NV7jNV7jR+MbQp6aHQ9z28sAAAAASUVORK5CYII=" preserveAspectRatio="none" id="img3"/>
    <clipPath id="clip4"><rect x="0" y="0" width="149444" height="681643"/></clipPath>
    <clipPath id="clip5"><rect x="175727" y="120673" width="243840" height="731176"/></clipPath>
    <image width="114" height="168" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAACoBAMAAADOVqcHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAHR0dHR0dHR0dHR0dHMWV1YAAAAEdFJOUwBAgL+jVN0MAAAACXBIWXMAABYlAAAWJQFJUiTwAAADTElEQVRo3sXabXKkIBAGYAUP4FZ5ADfxAGaHAyhy/zOtX6M0NDP9dnYr/IvxiU03MAymqv5va9Xyt1p+qqXr1XLSyrCoZVBmtw5hVMtZLZUdNSEEXV02qQt3k7pw7Sp1ddmlqi7NJr1aBr3U1KXbpaYuh9TUZdilpi6nVNTllIq6uKAN9ynxcE+oqMtT4nV5SngY1ZdEl91bonUxl0TrEkmwLpEE62JvCdYlkmBdYonVpQnajsYS62gXSWwFJBIaC0MsobFAJJRcIqHkEgkl1wVtcqlEkksglFwqkeRSCSS3phJIbiKR5A5UAsm1VALJTcJFkkuHAjJyyQSFRq6h4QIyGQvIyKV1QUYurQuSXFoXaFkgdYGWBVoXRNK6QGuu0yaXhgutuVad3FqdXNpRvYSSqx65VALJ7akEkvtFx3yeXFOAZk5WsewOW+h6MycLSpZcW6jxkMrsCbbQ95DKKZdskU3wiZzzW9iHDsEnnxCekdxuMshkvldfry6NQOYPbQSyZq8OUpk+dD9NkEnPyC6XdS6Th+4fKpxsc0kful8aGDnmkgxLU5Rz9vfp/GtKsgqMDF9JN3nZM/Ie+MlQJ3Lm5EyDZaWLO+Wyhw4vZDwlHf1dlW4uEjly8uy+eSk9K4+r3Qs5xGtg/OnRl7t5yTvcIfltIdhDdvHaQx7Rl2pyy4WXvhjsJe+6pNu08EpuAV0Lb7IfNW+l52W5XfIKF5Lk6BGXs1o+69LA8jm9IXlkflLLRSHPlbJVy6MuViFnXJ6jelHLoy4qOePSReEajdzrIpULkaNaelhea0+VnwAUG5U9IFsym2e1XNRy/VEsezqzpqqSypFKr5ZruFI5JaN8VEsvltnMap1WjlLp0znppTKfzZAUjxvSfkK235Li6pPWf09KK0Ha+ANyeisfa9tvWD4+fu2tvbdt27K5PPa23zwfd9y73vRtrX1mqAvX3sRdgcTNhhDSLyfX9ineSfEyvmDcEYG5t4ymKPkXXp/LtcF1nDRBcDyzhcsdFrx/gWRL8h3c08ZJwXu9jpG1SFpeCs6vav4rv+QN28BKAVzDZaToxSd3m/CYbsiPtIQvEq1a1rmUHp4+sit/hNJmV6QnoPlJo/7/pP5t+wtoEfJmMojKNgAAAABJRU5ErkJggg==" preserveAspectRatio="none" id="img6"/>
    <clipPath id="clip7"><rect x="0" y="0" width="723208" height="861545"/></clipPath>
  </defs>
  <g transform="translate(-733 -243)">
    <path d="M880.5 2220.75 924.134 1883.01 1128.01 1670.79 1332.91 1415.07 1492.4 1093.32 1588.66 859.587 1691.79 735.845 1836.17 563.981 1953.05 433.364 2035.55 343.995 2166.19 261.5 2276.19 261.5 2434.32 275.249 2509.95 378.368 2599.33 563.981 2755.42 770.898 2771.21 811.465 2882.44 984.69 3028.73 1110.68 3091.29 1309.7 3220.56 1501.85 3279.99 1684.53 3453.1 1855.72 3458.75 1993.89 3486.25 2103.88 3527.5 2234.5 880.5 2220.75Z" stroke="#000000" stroke-width="36.6667" stroke-miterlimit="8" fill="#AEAEAE" fill-rule="evenodd"/>
    <path d="M1670.78 1470.99 2163.44 921.5 2433.65 930.908 2847.09 1497.43 2895.5 1777.71 2811.92 2226.15 1576.45 2235.5 1503.5 1860.82 1670.78 1470.99Z" stroke="#000000" stroke-width="36.6667" stroke-linecap="round" stroke-miterlimit="8" fill="#3A3A3A" fill-rule="evenodd"/>
    <path d="M1857.86 1263.24C1857.24 1327.26 1856.62 1402.98 1856 1467L1892.04 1405.18 1897.19 1276.39 1907.48 1214.58 1912.63 1291.85 1933.22 1317.61 1938.37 1183.67 1984.7 1240.33 1995 1127" stroke="#747474" stroke-width="18.3333" stroke-linecap="round" stroke-miterlimit="8" fill="#747474" fill-rule="evenodd"/>
    <g transform="matrix(0.000360892 0 0 0.000360892 1671 1709)"><g clip-path="url(#clip1)" transform="matrix(1 0 0 1.00011 -0.168701 -0.290905)"><use width="100%" height="100%" xlink:href="#img0" transform="scale(6356.79 6356.79)"/></g></g>
    <g clip-path="url(#clip2)" transform="matrix(0.000360892 0 0 0.000360892 2320 904)"><g clip-path="url(#clip4)" transform="matrix(1.00124 0 0 1 0.230469 0.0968572)"><use width="100%" height="100%" xlink:href="#img3" transform="scale(6355.75 6355.75)"/></g></g>
    <g transform="matrix(0.000360892 0 0 0.000360892 2384 919)"><g clip-path="url(#clip5)" transform="matrix(1 0 0 1.00047 -175728 -120730)"><use width="100%" height="100%" xlink:href="#img3" transform="scale(6357.08 6357.08)"/></g></g>
    <path d="M1667.78 1469.99 2160.44 920.5 2430.65 929.908 2844.09 1496.43 2892.5 1776.71 2808.92 2225.15 1573.45 2234.5 1500.5 1859.82 1667.78 1469.99Z" stroke="#000000" stroke-width="36.6667" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>
    <path d="M1550.15 2235.5 761.5 2235.5 834.674 2070.32 862.831 1967.09 944.135 1822.56 958.544 1815.68 1192.41 1767.5 1257.46 1795.03 1436.33 1767.5 1517.63 1801.91 1623.33 1815.68 1663.98 1925.79 1680.24 1994.62 1655.85 2049.68 1696.5 2146.03 1647.72 2235.5 1550.15 2235.5Z" stroke="#000000" stroke-width="36.6667" stroke-linecap="round" stroke-miterlimit="8" fill="#AEAEAE" fill-rule="evenodd"/>
    <g transform="matrix(0.000360892 0 0 0.000360892 2426 1903)"><g clip-path="url(#clip7)" transform="matrix(1 0 0 1.00024 -0.0988547 0.204346)"><use width="100%" height="100%" xlink:href="#img6" transform="scale(6343.93 6343.93)"/></g></g>
    <path d="M2616.5 2227.91 3592.5 2234.5 3566.12 2132.28 3526.55 2020.18 3490.28 1881.69 3480.39 1855.31 3434.23 1799.26 3411.15 1782.77 3299.04 1805.85 3219.91 1749.8 3144.07 1746.5 3068.23 1756.39 3025.36 1789.36 2906.66 1746.5 2807.74 1772.88 2692.34 1917.96 2649.47 2072.93 2649.47 2155.36 2616.5 2227.91Z" stroke="#000000" stroke-width="36.6667" stroke-linecap="round" stroke-miterlimit="8" fill="#AEAEAE" fill-rule="evenodd"/>
  </g>
</svg>
                </div>
                <div class="legend-key">
                    <p class="legend-label text-bold-weight">Cave</p>
                    <p class="legend-description"></p>
                </div>
                <input class="form-check-input" type="checkbox" id=""/>
            </div>
        </div>
        `;

        point_tab.insertAdjacentHTML("beforeend", sinkhole);
        point_tab.insertAdjacentHTML("beforeend", cave);
    }); // end fetch for point units 

    fetch("/data/BoundaryUnits.json")
    .then(response => response.json())
    .then(contents => {
        console.log(contents);
        const boundary_units = contents.units;

        const HEIGHT = 40;
        const WIDTH = 40;

        let legend_row;

        for (let i = 0; i < boundary_units.length; i++) {
            if (boundary_units[i].number != 1) { // solid lines  
                legend_row = `
                <div class="legend-row">
                    <div class="legend-toggle">
                        <div class="legend-swatch">
                            <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <line x1="2" y1="20" x2="38" y2="20" stroke="#${boundary_units[i].hexcode}" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="legend-key">
                            <p class="legend-label text-bold-weight">${boundary_units[i].label}</p>
                            <p class="legend-description">${boundary_units[i].description}</p>
                        </div>
                    </div>
                    <input class="form-check-input" type="checkbox" id="toggle-${boundary_units[i].label}"/>
                </div>
                `;
            } else { // dashed lines
                legend_row = `
                <div class="legend-row">
                    <div class="legend-toggle">
                        <div class="legend-swatch">
                            <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <line x1="2" y1="20" x2="38" y2="20" stroke="#${boundary_units[i].hexcode}" stroke-width="2" stroke-dasharray="8 4" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="legend-key">
                            <p class="legend-label text-bold-weight">${boundary_units[i].label}</p>
                            <p class="legend-description">${boundary_units[i].description}</p>
                        </div>
                    </div>
                    <input class="form-check-input" type="checkbox" id="toggle-${boundary_units[i].label}"/>
                </div>
                `;
            }

            boundaries_tab.insertAdjacentHTML("beforeend", legend_row);
        }
    }); // end fetch for boundary units 
}

