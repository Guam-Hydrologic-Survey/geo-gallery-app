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

// document.getElementById('locate').addEventListener('click', () => {
//     alert('Clicked on locate');
// });

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


/* ------------------------------------------------------------
event listener for location button (on dock)
------------------------------------------------------------ */

let locateMarker = null;
let locateCircle = null;

const locateBtn = document.getElementById('locate');

locateBtn.addEventListener('click', () => {
    console.log('Clicked on LOCATE button');
    map.locate({
        setView: true, maxZoom: 16
    });
});

map.on('locationfound', function(e) {
    if (locateMarker) { map.removeLayer(locateMarker); }
    if (locateCircle) { map.removeLayer(locateCircle); }

    locateMarker = L.marker(e.latlng, e.accuracy / 2).addTo(map);
});

map.on('locationerror', function(e) {
    alert("User denied location")
})


// demo purposes 
// getLayers("/data/points.json")
// getLayers("/data/polygons.json")

// official layers
getLayers("/data/GeoGalGMG2026.json", 1);
getLayers("/data/GeoGalGMGBndry2026.json", 2);
// getLayers("/data/GeoGalPoints2026.json", 3);
getLayers("/data/GeoGalPoints_08042026.json", 3);


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
        // return "#62d4f4";
        return "#345995";
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

        const aerial = /* html */ `
        <div class="legend-row">
            <div class="legend-toggle">
                <div class="legend-swatch">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><image width="932" height="936" xlink:href="data:image/png;base64,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7neeKUijr3yRII2+8kWCNLrDrgRp/DtIbQfp7bffLlEa3HrrrcFnP/tZ7+abb+Z30hESoRtttJFEqD9nzpxAYtR2kJpiNG+QSohOnDiR12Xv2Qyj+PAZlMzmmju/iWJxPXnNwg65ZjFpdzQpSNXputEBpPO/4HLqril09Om6piA1rbF+fLxIorTkDY2STqvmzbVP5MyAMkEafeWLBGn0lS8SpNEddiVI5XTdIkF6yy23SJQGN998c3DTTTd5Mvrfj8G16aabtmQ23nhjf+ONNw422mijcCRGywapKUYtBCkh2j+2DuT18J6STq9XmeF3Z/U1KTqAPbJL2i1ITbujKkjZ1XshSr2k03UzXD+6yvoS+emi77rMG6SG03X1c8WBQR/9+te/9noRpHL9aBSkcv1oFKSf//znO0H6uc99brUg/fSnPy1RGtx4443BJz/5Sf+GG27wrr/+euff+waNBOgmm2zityeQkRgtG6RZdkdLBCkh2l/EaH/YXHfW2t56spawS3ZJTUFq2h1NOF03DFIC6gV/+tOffFOQZrx+dJX1/eUvf8kvfIp//OMffrcgNe2OdglSeX5Y9z6S1/3Pf/5zmc5XvkiQRl/50o8g/cxnPtMJ0k996lNRkAaf+MQnguuvvz647rrrgmuuucZrD9FQM3Pnzg13QTfffHN/s802C2Q23XTTcMoEadruqMUgJUT7z9ZBvB4+a9LZXnesviZFB7Dv97//fbhLatod1aeSpgQpu6TtU3dNkZN0um601vE1Zuc5O4lSU5Cadke7BanayeZAoc9+/vOft3760596piCNvvJFgjT6yhcJ0ugrXyRIo6986VWQfvzjH5coDT72sY8FH/nIR4IPf/jD/lVXXeVdeeWV/A73mATo3LlzvS222MLfYostApnNN988nDJBmrY7aitIYzHqT5kyhddO/9mOomj4I346ee3rNSszfKbbey2zlqhGtEtqClLT7mhSkMqdMfVjuyj6agsdOaYg1eusg/SXv/wlH1pd/P3vfw+jVO+OdgtS0x8O1HPF2tfEj3/8Y69MkEZf+SJBGn3liwRp9JUvEqRy/ajNIL366qslSoMPfehDwZVXXhlcccUV/mWXXea1h9CwZP78+S2ZefPm+TJbbrllIDN37txwygRp2u6orSA17I56hGht2LoTqR4+W7qzufYE1Av0uhQdoDqyS6pjNEuQRjEaBSmnmb7g8ccf93XkZL1+VAUpa5rB3/72Nz9rkJp2R/VzFXu+OHCokR/84AdeL4JUbmgUBalcPxoFqVw/GgXpDTfckDdIgw9+8IPBZZddFnzgAx8I3v/+9wfve9/7/Isvvti76KKLZIiQLqL43Hrrrf2tttrKnz9/frDVVluFM2/evHBsBKlpd9RWkCbsjrIbWj82gyg+fKZ0Z2snLxrYW1OOR1G9rEFq2h2NxZPcjMT5D1b5nlfT6bpZrx9lTfOTKE0L0rTTdXWQqj8ecABRM48++qj3ve99z69LkF577bWdIP3oRz/aCdKrrrqqE6SXX355J0gvvfTSMEgvueQSidLgve99b3DRRRcF73nPe4J3v/vdwbve9S7//PPP98477zwZp373FyxY0IqNt+222/rbbrttsM0224Sz9dZbhyMxaitITbujtoPUtDs6bdo0QrSeiNH+sRVO0RBQL9DrUnSA6sW/E1AHqWl31BROMr/4xS94030hSj0dpHmuH43WVe44KqMfH6v761//GkZpPEhNp+smBanpjwcy//M//8NruoYefvhhT0aCNPoOUgnS6DtIJUij7yCta5BefPHFnSC98MILwyC94IILgvPPPz945zvfGZx33nnBOeecE3ieF5x99tnBO97xDv/MM8/0ZM444wzv9NNPH7igWbx4cUtm0aJF3qJFi/wddtghnO233z6Q2W677cJZsGBBIDFaVZCadkdtBalpdzQKUgnR6dOnD9zz5ghitL/0upUZYvQFtiKf9UTv6F27tCA17Y5GAcWO3gv+93//108KUr3Oem3j6ynzs5/9jA+0Lp544olWkTvsJpyuq58vOa2d13VNffOb3/S6BWn0HaQSpNF3kEqQRt9BKkEafQdpXYP0rLPOCt7+9rcHZ555ZnDGGWcEb33rW4PTTz89OO2004I3v/nNwSmnnOKffPLJ/kknneSfeOKJ3gknnOAdf/zx0bSOPfbYzqxcubIzej2TrFixoiWzfPnyzuy3337h7LPPPt6yZcvC2Wuvvfw99tjD33333cNptVrBkiVLgl133TXYeeedg8WLFwc77bRTsGjRomDhwoXBDjvsEMZoFKQSo1UFadrpumWD1LQ72g5SIrTe5LmpKkZleO67sxVO0cDumgK9I19Qr0NJn06aJUjZJX2BnLqbEjjG03VNQSpf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vfZazxSk+oZGSUGqb2jUJUiD973vfcHFF19MmALA4GJXtFmqei6JUQD9IVFaJkjV7mgUpMEXv/hForQiEqWmGxrZDFKJ0ViQEqUAMJh6vSsqQ9hUp6oY5TMeQH/dd999XtLpullvaGQIUqK0Ytdcc42XJUj1HXaTglRiNCVIg/e+973BRRddxIcWANRfP3ZFOUW3WlU9n3yuA6gHidIKgjT4whe+4N911118QFVEotQUpPoOu0lBqu6wmxikEqPtIA0uvPBCT0b/WwAAfdePEJXhM6E6VT6nPG8A6sX3/U6U6hgtGqR33XVXNERpRa655pqW6Q67SUGq77CbFKQSo6Ygfc973hMOUQoAtVFltKQNu6LVkrXVa25r+AwHUE8SpabdUdP1o0lBqmP0C1/4Qjh33HEHH1oVuvrqq72kINV32LUUpMG73/3u4IILLuBDDQD6px/Xicrw3l8tYhSAu+JRmhakphhNC9I777yTKK2YRGmZINV32E0KUonRWJCGc/755/MBBwC9w65ocxGjABBFqY7RskFKlPbGVVdd5ek77CYFqb7DblKQSoymBem73vWuMErPO+88nl8AqE6/QlSGmKkeMQoAEYnSKoL085//vEQpb4oVi6LUFKT6DrtJQarusJslSIN3vvOdwXnnncfzCwD29StE2RXtDWIUALR77703jFJbQSox2g5SorRHrrzySs90h12bQSoxGg/SdpQG55xzDs8xAJTXr+tEZXgf740qn2OeQwCDTaI0b5CaYtQQpMFtt93Gm2QPXHnlla0rrrjCzxKk+itfkoJUYrRbkJ577rkSpYQpABTTz9Nz2RXtHWIUALqJojTpDrtZdkdNQXr77bcTpT10+eWXe6Yg1XfYTQpSfYfdpCCVGFVBGnieF5x99tk81wDQXT9DVIb36t4hRgEgK4lSU4yWDVKitPcuu+wyT99hNylI9R12SwZpGKVnnXUWzzcArK7fIcquaG8RowCQ1z333BNGaQVBGtx66628efZQFKW2glRiNEuQvuMd7whHovTMM8/kOQeA/oeoDCHaW8QoABQlUWojSOMxKvO5z32OKO2DSy+91NNBqr/yJSlI9R12k4JUYtQQpMHb3/72QKKUMAXgqDqEqPz30VvEKACUFUVpliA1xWhSkBKl/SFRqu+wmxSk+g67SUEqMZolSNtRGpxxxhmejP63AUAD1SVE2RXtPWIUAGyRKDUFaZbd0S5BGtxyyy38xbYPLrnkEq/XQSoxKvO2t71NojQM09NPP50PVQBNVIcQleE9tj+qfO55TgG46e677/bSdkeLBilR2l8XX3yxFw9S/ZUvSUGqv/IlKUglRlOCNHjrW98aEKUAGqQuIcquaH9U/fzzeQnAbVGU2gzSW265JZzPfvazwc0338yHZx9IlMp0C1J9h12LQRq85S1vCU477TRPRv/7AGAAVB0iWYcQ7R9Zd/182Bw+HwFASJSWCVLD7mgnSNtRyhtun1x00UWejSBtf+VL1yCVGI0HaTtKg1NPPdWT0f8+AKghQhSiyutFZfhMBIC4u+66K4zSLEGatjtqCtLPfOYzRGmfSZgmfeVLUpDqr3xJClKJ0W5B+uY3vzmcU089NTj55JN5LQCoo7qEqAzvk/1FjAJAP0iUlrzDbmKQEqX1cOGFF3r9DtJTTjklHMIUQE1UHR95hl3R/qv69cBnHwCkkShN2x0tGaREaQ1ccMEFEqW+KUj1d5AmBWn8K1/SglRiNCVIwznxxBN5TQDotTrthsoQovVQ9WuC5xgAsrjrrrtatoO0HaPBpz/9aRnuwFsDEqamr3xJClL9lS9JQSoxagpSiVFTkJ500kkSpWGYnnDCCcQpgCrVLURliJR6qPp1wfMMAHlIlBYJUlOMGoI0uOmmm4Ibb7yRN+caOP/8872aBGnwpje9KZAoJUwBWFbHEOV9rh568drgeAcAirjjjjvCKE0L0iy7o0lB2o5SPpBr4rzzzvN0kOqvfEkKUv2VL2WCtB2lwRvf+Mbg+OOP5/UBoIxexEbe4X2tPqr+WhcZYhQAypAoLXuH3bQg/dSnPkWU1oyEaa+CVGI0LUjbURqG6XHHHcfrBEAWdYxQGa4TrZeqb14kw/MNALbcfvvtflVBSpTW0znnnOOlBan+DtKkII3f0KhEkAZveMMbwiFMARjIgb+8NxCiyKLqGOVeGQBQhTvuuMOzEaSGGA3nhhtuIDRq6Oyzz/Z6GaQSo0lBetxxx4Xz+te/Pjj22GM9Gf3vBeCUuu6GyhCi9USMAsAgu+2228IozROkGXZHw/nkJz8p419//fV8gNfQWWed5envIE0K0qTvII2CNH79aNEgbUdpOEcffTRhCrijzruhMoRoPfXijxd8FgFAL0iUpgVp2u5ohiCVnVJ2S2tMwtQUpPo7SHsVpMccc0w4Rx99dBimK1eu5LUDNFMvgqLMEKL11YubF/HZAwC9FEWpjlGLQRpcf/31vLnX1Jlnnum1pydBGrt+tFuQBq973evCkTBduXIlB4fAYKt7hMoQovVW9Sm6MhyvAEA/3Hrrra2qgvQTn/hEOERpvUmUnnHGGTKZgtT0lS9RkMZvaGQpSIOjjjoqnCOPPJLXETA46n5KbjSEaP314jXEawAA+kmi9JZbbvHLBqneHY0FaTS84dfc6aef7tUlSCVGVZCG89rXvtY/4ogjiFOgfuQ9fhB2Q2UI0frrxWuJ1wEA1IlEaZ4gTdsdNQXpddddF1x77bWExACQMO1FkEY3NMoZpMERRxwRzmte8xr/8MMP5zUF9M8gRaiMvF8QIPXXi1N0uZMuANTRZz/7Wa9bkJp2R7MGKVE6WE477TQvS5CavoM0ClLDd5DaDNJwDj/8cBn/sMMO47UFVG/QIpRdsMHSixjlswIA6kyitMRXvmQJUhn+MjlATj31VO+UU07x+x2kEqNJQfrqV786nMMOOyx41ate5R966KEccACWDBs2LIzQIUOGDEqEyhCig6cXry8+GwBgEEiUmnZHbQXpxz/+8XCuueYaPhgGiITpySefLHFaWZDGb2hUNEjbURrOoYce6h9yyCHeIYccwoEpkINE6JAhQ7yhQ4f6Q4YMCaIxHODXbQjRwSPPl34eqxiOOQBgkNx8881hlNoIUrU7Gg9SonRASZgWDdL4DY16EKTBK1/5ynAOOeQQGe/ggw/mNQcYSIRKgA4bNiyQGTp0aDgDEqSE6GDqxSm6Mrw2AGAQ3Xzzza0iQZq2O2oI0uCjH/0ogTCgTjzxRM8UpPEbGvUrSCVGDUEavOIVrwgOPvhgGX/FihXeihUrOFCBkyRAhw8f7q2xxhr+GmusEcjoGB2AIOXzY3ARowCAbD796U/7aUGatjuaJUg/9rGPyfhXX301HxoDSsL0hBNO8KoI0vgNjXSQtm9oVDRIg5e//OXhrFixQsY76KCDOLhFo40cObI1YsQIf/jw4UE0UYwOUJCyGzrYenVTLO5XAQBNctNNN3llvvIlQ5DKTim7pQ0gYZo3SOM3NOpXkL7sZS8L56CDDpLxly9f7i1fvpyDXgw0CdCRI0d6EqEjRowIojEFaRSjNQ5SQnTw9WpXlGMJAGgiidKqgrQdo8FHPvKR4Oqrr+aDpAGOP/54rz2r3dCoX0EqMZoxSIMDDzwwnOXLlwcvfelL/QMOOMDbb7/9OBhGrUUBOmrUKH/UqFHByJEjOzOgQUqENkcvdkVlOIYAgCa78cYbWzaDVO2OhkHajlLCtEGOO+44r1dBGr+hkcUgDeeAAw4IZ//99/f3228/CVReo+ibsWPHtmTGjBnjjx49WiaQkRCNpluQmk7XrUGQSrgQos3Rq7vo8poBAJfceOONXpEgNe2OpgRpcNVVV3HA3yASpscee6xXNkjjNzTqU5AG++23Xzj77rtvOPvss48ns2zZMg6IUIl4gMqMHTs2GDNmTDhRjA54kBIUzdOrU3S5XhQAXBRFaVqQpu2OZgnSD3/4wzL+lVdeyUFKw0iYpgVp/A67/QpSidEcQRrO3nvvHSxbtizYa6+9/D333JNARWESn+PHj/fGjx/vjxs3LohGQjQeo3mD1HS6bpYgNUSAjZGQkGjh96RZenXjIhn+cA0ALpMoLfOVLxmDVHZK2S1tqKOPPtprT1+CtH2HXetB2o7ScPbcc89w9thjD3/p0qVeezgAR2jixImt9ngTJkzw2xOMHz++Mw0MUnZDm6tXu6IyvIYAAC9cV3rDDTf4VQVpO0aDD33oQ8GVV15JlDbYypUrvfZYDdL4HXb7FaR77LFHOEuXLg1n9913D2e33XbzlyxZ4rWHg6sGmzJlShiekydP9iZPnuxPmjRJJpg4cWJnJESjsRmkptN1swSp5dN1idDm69WuKK8lAMDqbrjhBs9GkCbsjoZB2o5SwtQBRx55pNeegQlSidECQRq0Wq1wlixZEs6uu+4q4++yyy7e4sWLZTjwGjASnzJrrrmm355AZvLkyeFIiEaTJ0ijGB2gICUc3NCrGxfJcL0oACDZ9ddfH0ZpkSA17Y6mBGlw+eWXE6WOkDA94ogjvLQgjX/lS5VBKjHaoyANdtlll2DnnXcOZ/HixeHstNNO/qJFizyZhQsXyrRk9JqhWtOnT2/JSHROnTrVmzp1qr/WWmvJBDJTpkzpTBSjgxKkptN1cwYpEeqWXp6iy+c+AKA7idIsQWraHc0TpFdccYWMf9lll3Hg4xAJ08MPP9xrepBKjCYEabBo0aJwdtxxx84sXLgwnB122MHffvvtvWgWLFjA70cBUXC2x1t77bX9adOm+dOnTw9kpk2bFs7UqVM7E8VoXYLUdP1ohUFKhLqnlzcukuH1BQDI57rrrvNNQWraHS0RpLJTym6poyRMDz/8cN92kMa/8qXKIJUYrSBIO7P99tt3ZrvttovG33bbbf0FCxZ422yzTWfmz5/fikavc1PMnDmzpcaTWWeddfz4zJgxI4hm7bXX7kwUo0WDNIrRvEFqun60JkFKhLqrl7uivM4AAMVde+21nml31FaQtmM0+OAHPxhcdtllRKnDDjvsME8ma5DGv/Jl0IM0itGMQRosWLAgnG233bYz22yzTWe23nrrzsyfPz/YaqutfJl58+Z5eubOnRtNK2k23XTTcPRzlmTOnDmtLDN79mwvmlmzZoWz/vrr+2oCmfXWW68z6667bmdmzpwZzjrrrNOZbkEaxaijQRrFQebnE43S611RPtcBAOVFUWozSNXuaBik7SglTPGSQw891GtP34M09pUvAxuk0Wy11VbhzJs3rzNbbrllZ+bOnduZLbbYIpzNN9+8M5tttllnNt10085ssskmndl4443D2WijjTozZ86czmy44YadmT17dmc22GCDcGbNmtWZKEaTgjSK0SYFqen60SxBarqhUTtIfRkCFD3eFZXhsxwAYM8111zT+vjHP+4XDVLT7mhKkAaXXnopH2ToOOSQQzwZgrR4kEYxSpD2JkhN14/2MEj9YcOGtWT07xKc1OtdUf4AAgCozjXXXOPlCVLT7miWIP3ABz4QDmEK7eCDD/ZkbAZp/DtIqwxSiVGCdPUgjWKUIC0cpH4Uofr3Bc5jVxQA0DxRlJqC1LQ7WjJIZfxLLrmEAy0YrVixwpNxJUijGCVIexOkpjvs1iRI2QVFml7visrwWgQA9NZHP/pRr+h3kOYJ0ve///3hXHLJJfzlFalWrFjROuigg7wDDzzQ10EqMdqLII1/B6lrQRrFaB2D1HSH3QELUn/48OHeyJEjOehHN73eFZXwBQCgPyRKbQep2h2NB2k4F198MWGKTJYvX95avny5d8ABB8gQpARpLYPUdIfdUaNG+RKfBChy6MeuKJ/HAIB6+MhHPuKXDVLT7qgpSN/3vvcRpShsv/3282T23XdfnyA1B2kUo3UMUtNXvjQgSH0ZAhQl9DpEuXERAKB+rr76ai9PkJp2R7MGaTtKCVOUts8++3jt8bMGqcQoQUqQ6iA1feWLKUjHjBnjjx071hs7diwH9ChLXkM6FqsePncBAPUVRWlakJp2R0sEaXDRRRfx4Qhrli1b1lq2bJkns9dee/kEKUFaMkj9cePGSYC2CFBY1I/Tc9kVBQAMjquuusrTQZp2um6ZIH3ve98rUUqYojJLly5tLV261JPZfffd/UEJ0ihG6xikUYzWMUhNX/nSLUgnTJjgy4wfP96bOHEi8Ykq9fqmRTLcuAgAMHgkSvXuqK0gjcdoLEiDCy+80Lvooos4EERPLFmypLXbbrt5S5Ys8Vqtlk+QOhOk/qRJk3wJTxn9ugAq0o9dURn+2AsAGGwf+tCHfFtBatodjQfpe97znnAkTPW/A+iVXXbZxYtm55139gnSwQzSNddc05eZPHmyN2XKFOIT/dSPEOUUXQBAc1x55ZVekSA17Y5mDNJwLrjgAsIUtbF48eLWokWLvGh23HFHX4Yg7VuQ+lOnTo0mjE4Z/bwBfdSP03Nl+OwEADTPlVde2briiiv8LEFq2h0tEqTvfve7wyFMMQgWLlzY2n777b3Y+ARpqSD111577XCmT5/uTZ8+vSWj1x2ooX6dnsuuKACg+S6//HIvKUjTTtctGaTB+eefT5RioC1YsKAVG2+bbbaJj9+eJgepv+6663Zm5syZXmxa0eh1AwZIv0JUhs9IAIBbJEyjIDWdrls2SOMxKvOud70rHMIULpk/f34rmnnz5nl65s6dG86WW27pb7HFFqvN5ptv3pkcQepvtNFGndlwww1Xm9mzZ8t4MrNmzYpPKz765wEarF+n57IrCgBw12WXXebZDlLT7qgK0nDOO+88whQA0G/9ClEZPgcBABASpmWDNO10XVOQvvOd7wyHMAUA9EE/T8/le0UBANAkSosEqel03ZxBSpQCAHql3yHK6bkAAKS59NJLvbQgNe2OWgjS4Nxzzw3OOeccwhQAUBVOzwUAYBBEURoPUtPuqK0glRhtB2k4Z599Nh/cAABbZFdSB2Kvhl1RAACKuuSSS7y003WLBqlpdzQepJ7nhUOYAgBK6OfpuTJ8hgEAUNYll1zSkjC1EaSm3dEuQRrOWWedxYc6ACCrfocou6IAANh28cUXh1FaJEjTTtfNEqTveMc7ZHzCFACQot8hKsPnFAAAVZIwzRqkptN1SwSp7JQGZ555piej/10AAGfVIUTZFQUAoFckSt/73vf6SUFqOl23bJBKjMq8/e1vD4cwBQDnEaIAALjsoosu8uJBajpdt2yQxndHVZCGc8YZZ3gy+t8GAGisOoSoDCEKAEAdXHjhhZ7tIDWdrmsK0re97W3hEKYA0Hh1CVE+awAAqCMJ07JBajpdN2OQhnP66adzoAAAzVKXEOX0XAAA6k6itEiQmk7XLRKkb33rW8MhTAFg4BGiAACgmAsuuMDLEqSm03XLBunpp58ezlve8pbgtNNO82T0vw8AUFt1CVEZPj8AABhkEqamIDWdrls2SGO7o50gbUdpGKannnoqBxYAUF+EKAAAqMb555/v6d1RW0FqOF3XFKTBm9/85nAIUwColTqFKKfnAgDQVBKlNoPUdLpuxiCNhjAFgP6R92AdhP0aQhQAAFecd955XpkgNZ2uWyRITznllHBOPvlkwhQAeqNOu6HR8BkAAICLJEzzBKnpdF1LQRrOiSee6MnofycAoDRCFAAA1NM555zjpQWp6XTdKoL0pJNOCocwBQBrCFEAADAYJExrEqThvOlNbwpOOOEEDlwAIL86hqj8ewAAANKdffbZnj5dt19B2o5SwhQAupMIrdONiqLhhkUAACC/s846y7MVpFGMlgjS4I1vfGNw/PHHezL63woADqvjbqgMIQoAAMqTMC0apHp3tGyQtqM0GsIUgKuiCCVEAQCAG84880wva5Amna5rM0jf8IY3hHPcccd5MvrfCwANVNfdUBlCFAAAVE/CNClITafr9iBIw3n9618fHHvssYQpgKapc4TKEKIAAKC3JErPOOMMr25B2o7SMEyJUwADjhAFAABII1EqY7p+tM9BGhxzzDHhHH300d7KlSs5aAIwCOoeoTKEKAAAqJ/TTz/d6xakUYz2OEij8VeuXMmuKYA6IkQBAABskDDtFqRRjPYySF/3utd1RsKUOAXQZ4MQoTLyXkmIAgCAwXLaaad53YI0itFeBunKlSs7c9RRRwVHHnmkJ6P//QBQgUGJUHZDAQBAM0iYnnrqqV7dglRiNJojjzwynCOOOMKT0T8DAJQwKBEqQ4gCAIBmkihtz2pBGsVov4P0ta99bThHHHFEFKccmAEoYpAiVIYQBQAA7jj55JM9U5BGMdrLII1i1BCkwWte85pwDj/8cO+www7jYA1AmihCCVEAAIBBIGFqCtIoRnsZpFGMJgRpOK9+9auDww47jDgFEBnECJXh0gQAAIDIiSee6JmCNIrRXgZpFKNJQdqO0nAOPfRQ4hRwT2vIkCG+jCH06jzshgIAAKSRMJXRQRrFaC+DNIrRtCB91ateFc6hhx4axukhhxzCrgPQQMOGDWsNHTrUlxkyZEgQjSH66jiEKAAAQF4nnHCCp4M0itFeBmkUoxmCNHjlK18Zzite8Qpf4vSQQw7hIBAYQBKgsQgN4jMgQSoRyveHAgAAlCVhevzxx3v9DtIoRrME6SGHHBLOK17xinAOPvhgT0b/bADqQwJ0jTXW8GWGDRsWRJMUozUNUnZDAQAAqiJhGo/RAQrScF7+8pfL+CtWrPBWrFjBQSPQRxKgw4cP94YPHy4RGsRnwIKU3VAAAIBeOu6447z29DxIoxgtEaTBihUrwnnZy14WHHTQQZ6M/hkB2Ddy5MjWiBEj/BEjRgTDhw/vzIAGKbuhAAAA/SZhGsVoL4M0itGyQdqO0nAOPPBAf/ny5d7y5cs5yAQskAAdOXKkF0VofJKCNB6jaUFqCMReDBEKAABQR8cee6zXnp4GaRSjloI0nOXLl4fz0pe+1D/ggAM8Gf3zAlidBOioUaP89gQjR47szIAHKSEKAAAwKCRMjznmGL8BQRrOAQccEM7+++8f7Lfffl57ODiF08aOHduSGT16tN+eQCI0PgMepEQoAADAIDv22GNbRx99tNeLII1itOogbUdpOPvuu2+wzz77eDLLli3jwBWN1g5Qb8yYMf6YMWOCaCREo8kapPEYrVmQSoQSogAAAE2zcuXK1sqVK72qgzSK0V4FaTtKO7P33nv7y5Ytk0DlNF8MNAnQcePG+TJjx44N4tOrII3HaIVBSoQCAAC4RML0yCOP9JoWpHvvvXdnli1bFs5ee+0V7Lnnnp7M0qVLOeBFLU2cOLElM378eL89wbhx4zrT0CAlQgEAAFwnYSpjO0ijGO1HkEYxGgVpO0rD2WOPPcLZfffd/aVLl3q77bYboYqeicJz4sSJ3oQJE/wJEyYE0UiExicpSOMxOoBBSoQCAADA7IgjjvDaYy1IoxitW5AuXbo0nN133z2c3XbbTcZfsmSJ1x4OmlFYFJ6TJ0/2Jk2a5LcnkJk4cWJnqgzSeIymBWk8RisKUiIUAAAA+Rx++OFeewY2SKMYzRGkQavVCmfJkiXh7LrrrjL+Lrvs4sksXryYA2usYsqUKS2ZNddc029PMHny5M5EITroQRqP0QxBSoQCAADADgnTww47zCsTpFGM9iNIoxgtEaTBLrvsEs7OO+8czuLFi4OddtrJX7RokRfNwoULOQBvoCg42+OttdZavozE55QpU4JoJESjcTRIiVAAAABUS8JUhiBdHEVpOIsWLQpnxx13jMbfYYcd/IULF0qoettvvz3BWmPTp09vtcebNm2aH83UqVOD+Ky11lqdSYpRh4KUu+MCAACgfw477LDWoYce6h166KF+1iCNYrQfQRrFaI+CNFi4cGFndthhh85sv/32Mn57vAULFkTDgX0FZs6c2ZKR4JwxY4Y3Y8YMf+21144mkJk+fXpnpk2b1hnbQRqP0bQgjcdozYI0ClBeqwAAAKiXQw45xGsPQdo9SDuz3XbbdWbBggWd2XbbbWX8aLbZZhsvmvnz58u0ZPTz0GSzZs1qyUSRud5663kzZ84MZ9111/XXWWedcGbOnBnIrLPOOp2ZMWNGZ6IQHfQgjcdoRUHqywwbNsyp1xkAAAAa4OCDD/bas1qQRjHajyCNYnRAgrQz22yzTWe23nrrzsyfP3+V2Wqrrfxo5s2b50Uzd+7cpGnFZ9NNN11t9HObZM6cOa0sM3v2bM80s2bN8jbYYANfZv311w9n1qxZwfrrr7/KrLfeep1Zd911OxOFKEGa/JUvaUEaRagEKBEKAACAxlixYoXXHoK0+iDtzLx58zqz5ZZbrjJz587tzBZbbNGZzTfffJXZbLPNOrPpppt2ZpNNNlllNt54485stNFGnZkzZ84qs+GGG3Zm9uzZq8wGG2zQGQnRaAjSSoPUlyFAAQAA4IyDDjrIaw9BSpCuFqNpQRqPUYK0cJCyCwoAAACI5cuXtyRODzzwQL+XQRrFKEHazCCNxyhBOsIfPny4N3LkSAIUAAAASCOBunz5cu+AAw7wCFKCtOogjcdoQ4LUl5H4JEABAAAACyRO99tvP2///ff3bQdpFKMEKUGaFqTxGE0L0niM9ihIfRkCFAAAAOiR/fbbr7XPPvt4++67r0+QEqSDGKTxGM0ZpBKg3tixY4lPAAAAoA6WLVvWWrZsmdcegpQgbUqQ+hKgEp8EKAAAADBAJFL33HNPrz1+L4M0HqMEKUGaMUj99rD7CQAAADTR0qVLW0uXLvVkdt99d990Q6NeBmk8RglSN4J0woQJvoyE58SJE1sy+nUKAAAAwCFLlixpLVmyxJNptVp+3YI0HqME6UAFqT9p0iSf8AQAAACQm4TqLrvs4rXHJ0gJ0oQg9WUmT57MricAAACAai1evLi1ePFib9GiRdH4dQjSeIwSpFaD1F9rrbXCmTJlijdlypRWNPq1AQAAAAB9tXDhwtbChQu9aHbYYQefIK13kE6bNs2XmTp1qjd9+vSWDMEJAAAAoFEWLFjQktl+++29BQsWhLPddtv5Mr0K0niMOhKk/owZM6LpBKeMfn4AAAAAwHlRuMpss802Xny23nprPxoHg9SPz8yZM732tOKj1xMAAAAAULH58+e3ZObNm+fFZ+7cucbZYost/Phsvvnmq8xmm20mkzVIfZmNNtqoMxtuuOFqM3v2bE/PrFmz4tOKj/4ZAQCoi/8PcW8UBlxmXJ8AAAAASUVORK5CYII=" preserveAspectRatio="none" id="img0"></image><clipPath id="clip1"><path d="M237420 3241890 5859594 3241890 5859594 5941663 237420 5941663Z" fill-rule="evenodd" clip-rule="evenodd"/></clipPath><clipPath id="clip2"><path d="M237420 3241890 5859594 3241890 5859594 5941663 237420 5941663Z" fill-rule="evenodd" clip-rule="evenodd"/></clipPath></defs><g transform="translate(-1045 -231)"><g transform="matrix(0.000360892 0 0 0.000360892 1189 1269)"><g clip-path="url(#clip1)" transform="matrix(1 0 0 1.00069 -237420 -3244127)"><use width="100%" height="100%" xlink:href="#img0" transform="scale(6347.93 6347.93)"></use></g></g><g transform="matrix(-0.000360892 4.41966e-20 -4.41966e-20 -0.000360892 3218 1206)"><g clip-path="url(#clip2)" transform="matrix(1 -3.43456e-24 -1.79572e-25 1.00069 -237420 -3244127)"><use width="100%" height="100%" xlink:href="#img0" transform="scale(6347.93 6347.93)"></use></g></g><path d="M1895.52 1015 2044.85 1139.7 2067.67 1112.5C2103.07 1077.69 2151.97 1056.15 2205.99 1056.15 2300.52 1056.15 2379.39 1122.1 2397.64 1209.77L2399.05 1223.58 2453.45 1259.25 3310.77 1259.25 3331.19 1269.29 3337.99 1279.32 3344.79 1296.05 3355 1316.13 3351.6 1326.17 3331.19 1349.59 3280.15 1403.12 3201.91 1460 2490.88 1456.65 2374.48 1344.73 2368.2 1356.11C2333.05 1407.28 2273.51 1440.93 2205.99 1440.93 2111.46 1440.93 2032.59 1374.98 2014.35 1287.31L2010.68 1251.5 1973.76 1232.48 1048.4 1229.14 1045 1209.06 1045 1188.99 1051.8 1145.49 1068.81 1122.07 1109.64 1078.57 1211.7 1018.35Z" fill-rule="evenodd"/><path d="M2110 1253.5C2110 1200.2 2153.88 1157 2208 1157 2262.12 1157 2306 1200.2 2306 1253.5 2306 1306.8 2262.12 1350 2208 1350 2153.88 1350 2110 1306.8 2110 1253.5Z" fill="#FFFFFF" fill-rule="evenodd"/></g></svg>
                </div>
                <div class="legend-key">
                    <p class="legend-label text-bold-weight">Aerial</p>
                    <p class="legend-description"></p>
                </div>
                <input class="form-check-input" type="checkbox" id=""/>
            </div>
        </div>
        `;

        point_tab.insertAdjacentHTML("beforeend", sinkhole);
        point_tab.insertAdjacentHTML("beforeend", cave);
        point_tab.insertAdjacentHTML("beforeend", aerial);
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

