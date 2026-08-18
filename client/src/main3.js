// libraries, extensions, plugins
import L from 'leaflet';
import Viewer from 'viewerjs';

// styles
import 'viewerjs/dist/viewer.css';
import 'leaflet/dist/leaflet.css';

// import "leaflet.locatecontrol"; // Import plugin
// import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"; // Import styles

import { MapContainer } from './components/MapContainer.js';

// components 
// import { Legend } from './components/Legend.js';
import { NavBar } from './components/NavBar2.js';
import { About } from './components/About2.js';
import { Legend } from './components/Legend2.js';
import { Tutorial } from './components/Tutorial2.js';
import { Gallery } from './components/Gallery2.js';
import { Dock } from './components/Dock2.js';


/* ------------------------------------------------------------
initialize and add components to #app
------------------------------------------------------------ */


const app = document.getElementById("app");

app.append(NavBar(), MapContainer(), Dock());

document.body.append(About(), Tutorial(), Legend(), Gallery());


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


// document.getElementById('toggle-layer').addEventListener('click', () => { 
//     if (currentLayer === 'ewtm') {
//         map.removeLayer(ewtm);
//         ewi.addTo(map);
//         currentLayer = 'ewi';
//     } else {
//         map.removeLayer(ewi);
//         ewtm.addTo(map);
//         currentLayer = 'ewtm';
//     }
// });

// document.getElementById('zoom-in').addEventListener('click', () => {
//     map.zoomIn();
// });

// document.getElementById('zoom-out').addEventListener('click', () => {
//     map.zoomOut();
// });

// document.getElementById('recenter').addEventListener('click', () => {
//     map.setView(center, defaultZoom);
// });

// // document.getElementById('locate').addEventListener('click', () => {
// //     alert('Clicked on locate');
// // });

// document.addEventListener('keydown', (pressed) => {
//     if (pressed.key === "Escape") {
//         if (viewer && viewer.isShown) {
//             pressed.preventDefault();
//             pressed.stopPropagation(); // prevent boostrap from noticing this event 
//             pressed.stopImmediatePropagation(); 
//             viewer.hide(); // close the viewer only 
//         }
//     }
// }, true);


/* ------------------------------------------------------------
event listener for location button (on dock)
------------------------------------------------------------ */

// let locateMarker = null;
// let locateCircle = null;

// const locateBtn = document.getElementById('locate');

// locateBtn.addEventListener('click', () => {
//     console.log('Clicked on LOCATE button');
//     map.locate({
//         setView: true, maxZoom: 16
//     });
// });

// map.on('locationfound', function(e) {
//     if (locateMarker) { map.removeLayer(locateMarker); }
//     if (locateCircle) { map.removeLayer(locateCircle); }

//     locateMarker = L.marker(e.latlng, e.accuracy / 2).addTo(map);
// });

// map.on('locationerror', function(e) {
//     alert("User denied location")
// });


/* ------------------------------------------------------------
add map layers 
------------------------------------------------------------ */

// official layers
getLayers("/data/GeoGalGMG2026.json", 1);
getLayers("/data/GeoGalGMGBndry2026.json", 2);
getLayers("/data/GeoGalPoints_08182026.json", 3);


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

// params: 
// data (url to geojson) 
// ftype (feature type: 1 = polygon, 2 = boundary, 3 = point)
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
                        // layer.bindPopup(`
                        //     <p class="text-bold-weight">${feature.properties.UnitAbr}</p>
                        //     <p>${feature.properties.MapUnit}</p>
                        //     <p>Formation: ${feature.properties.Formation}</p>
                        //     <p>Epoch: ${feature.properties.Epoch}</p>
                        //     `);

                        // layer click event
                        layer.on('click', async () => {
                            // TODO - clean this up to JS-focused creation instead of raw HTML and strings
                            const formation = feature.properties.Formation.trim() === "" ? "" : `<p>Formation: ${feature.properties.Formation}</p>`;

                            document.getElementById("text-info").innerHTML = /*html*/ `
                            <p class="text-bold-weight">${feature.properties.UnitAbr}</p>
                            <p>${feature.properties.MapUnit}</p>
                            ${formation}
                            <p>Epoch: ${feature.properties.Epoch}</p>
                            `;

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
            // original 
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

            // const sinkhole = L.icon({
            //     iconUrl: "/assets/geo-gallery-icon-sinkhole.svg",
            //     iconSize: [40, 40]
            // });

            // const aerial = L.icon({
            //     iconUrl: "/assets/geo-gallery-icon-aerial.svg",
            //     iconSize: [40, 40]
            // })

            // const cave = L.icon({
            //     iconUrl: "/assets/geo-gallery-icon-cave.svg",
            //     iconSize: [40, 40]
            // });

            const sinkhole = /*html*/ `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="1191 229 2021 2021"><g fill="none" stroke="#000" stroke-width="37"><path d="M1210.5 1238.5h330M2200.5 248.5v330M1496.5 537.5l231 231M2899.5 535.5l-231 231M2690.5 1713.5l231 231M2200.5 1901.5v330M2860.5 1238.5h330M1721.5 1685.5l-231 231M1210.5 1238.5c0-546.8 443.2-990 990-990s990 443.2 990 990-443.2 990-990 990-990-443.2-990-990Z"/></g></svg>
            `;

            const aerial = /*html*/ `
            `;

            const cave = /*html*/ `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2884 2012"><path fill="#aeaeae" stroke="#000" stroke-width="37" d="M147.5 1977.8 191 1640l204-212.2 204.9-255.7 159.5-321.8 96.3-233.7 103.1-123.8L1103.2 321 1220 190.4l82.6-89.4 130.6-82.5h110l158.1 13.7 75.7 103.2 89.3 185.6 156.1 206.9 15.8 40.6 111.2 173.2 146.3 126 62.6 199 129.3 192.2 59.4 182.6 173.1 171.2 5.7 138.2 27.5 110 41.2 130.6z"/><path fill="#3a3a3a" stroke="#000" stroke-linecap="round" stroke-width="37" d="m937.8 1228 492.6-549.5 270.3 9.4 413.4 566.5 48.4 280.3-83.6 448.5-1235.4 9.3-73-374.7Z"/><path fill="#747474" stroke="#747474" stroke-linecap="round" stroke-width="18" d="M1124.9 1020.2c-.7 64.1-1.3 139.8-1.9 203.8l36-61.8 5.2-128.8 10.3-61.8 5.1 77.3 20.6 25.7 5.2-133.9 46.3 56.6L1262 884"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-width="37" d="m934.8 1227 492.6-549.5 270.3 9.4 413.4 566.5 48.4 280.3-83.6 448.5-1235.4 9.3-73-374.7Z"/><path fill="#aeaeae" stroke="#000" stroke-linecap="round" stroke-width="37" d="M817.2 1992.5H28.5l73.2-165.2 28.1-103.2 81.3-144.5 14.4-6.9 233.9-48.2 65.1 27.5 178.8-27.5 81.3 34.4 105.7 13.8 40.7 110.1 16.2 68.8-24.3 55.1 40.6 96.3-48.8 89.5ZM1883.5 1984.9l976 6.6-26.4-102.2-39.5-112.1-36.3-138.5-9.9-26.4-46.2-56-23-16.5-112.2 23.1-79.1-56.1-75.8-3.3-75.9 9.9-42.8 33-118.7-42.9-99 26.4-115.4 145.1-42.8 154.9v82.5Z"/></svg>
            `;

            const customIcons = [0, 1, 3]

            const ptLayer = L.geoJSON(data, {
                pane: 'pointPane',
                pointToLayer: (feature, latlng) => {
                    switch (feature.properties.SCode) {
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
                            // return L.circleMarker(latlng, {
                            //     radius: 8, 
                            //     fillColor: getColor(feature.properties.SCode),
                            //     color: "#000",
                            //     weight: 2,
                            //     fillOpacity: 1,
                            //     pane: 'pointPane'
                            // });
                            // return L.marker(latlng, { 
                            //     icon: sinkhole, pane: 'pointPane' });
                            return L.marker(latlng, {
                                icon: L.divIcon({
                                    className: "custom-icon",
                                    html: sinkhole,
                                    iconSize: [40, 40]
                                })
                            });
                        case 3:
                            // console.log("Aerial")
                            return L.circleMarker(latlng, {
                                radius: 8, 
                                fillColor: getColor(feature.properties.SCode),
                                color: "#000",
                                weight: 2,
                                fillOpacity: 1,
                                pane: 'pointPane'
                            });
                            // return L.marker(latlng, { 
                            //     icon: sinkhole, pane: 'pointPane' });
                            // return L.marker(latlng, {
                            //     icon: L.divIcon({
                            //         className: "custom-icon",
                            //         html: aerial,
                            //         iconSize: [10, 10]
                            //     })
                            // });
                        case 4:
                            // console.log("Cave")
                            // return L.circleMarker(latlng, {
                            //     radius: 8, 
                            //     fillColor: getColor(feature.properties.SCode),
                            //     color: "#000",
                            //     weight: 2,
                            //     fillOpacity: 1,
                            //     pane: 'pointPane'
                            // });
                            // return L.marker(latlng, { 
                            //     icon: cave, pane: 'pointPane' });
                            return L.marker(latlng, {
                                icon: L.divIcon({
                                    className: "custom-icon",
                                    html: cave,
                                    iconSize: [40, 40]
                                })
                            });
                    } // end of switch statement 
                }, // end of pointToLayer property
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

            ptLayer.addTo(map);
            ptLayer.bringToFront();
            
            // // original 
            // data.features.forEach(feature => { 
            //     const id = feature.properties.SCode;
            //     const ptLayer = L.geoJSON(data, {
            //         pane: 'pointPane',
            //         // style points 
            //         pointToLayer: (feature, latlng) => {
            //             switch (id) {
            //                 case 0:
            //                     return L.circleMarker(latlng, {
            //                         radius: 8, 
            //                         fillColor: getColor(feature.properties.SCode),
            //                         color: "#000",
            //                         weight: 2,
            //                         fillOpacity: 1,
            //                         pane: 'pointPane'
            //                     });
            //                 case 1:
            //                     return L.circleMarker(latlng, {
            //                         radius: 8, 
            //                         fillColor: getColor(feature.properties.SCode),
            //                         color: "#000",
            //                         weight: 2,
            //                         fillOpacity: 1,
            //                         pane: 'pointPane'
            //                     });
            //                 case 2:
            //                     // console.log("Sinkhole")
            //                     return L.circleMarker(latlng, {
            //                         radius: 8, 
            //                         fillColor: getColor(feature.properties.SCode),
            //                         color: "#000",
            //                         weight: 2,
            //                         fillOpacity: 1,
            //                         pane: 'pointPane'
            //                     });
            //                     // return L.marker(latlng, { 
            //                     //     icon: sinkhole, pane: 'pointPane' });
            //                     // return L.marker(latlng, {
            //                     //     icon: L.divIcon({
            //                     //         className: "custom-icon",
            //                     //         html: sinkhole,
            //                     //         iconSize: [10, 10]
            //                     //     })
            //                     // });
            //                 case 3:
            //                     // console.log("Aerial")
            //                     return L.circleMarker(latlng, {
            //                         radius: 8, 
            //                         fillColor: getColor(feature.properties.SCode),
            //                         color: "#000",
            //                         weight: 2,
            //                         fillOpacity: 1,
            //                         pane: 'pointPane'
            //                     });
            //                     // return L.marker(latlng, { 
            //                     //     icon: sinkhole, pane: 'pointPane' });
            //                     // return L.marker(latlng, {
            //                     //     icon: L.divIcon({
            //                     //         className: "custom-icon",
            //                     //         html: aerial,
            //                     //         iconSize: [10, 10]
            //                     //     })
            //                     // });
            //                 case 4:
            //                     // console.log("Cave")
            //                     // return L.circleMarker(latlng, {
            //                     //     radius: 8, 
            //                     //     fillColor: getColor(feature.properties.SCode),
            //                     //     color: "#000",
            //                     //     weight: 2,
            //                     //     fillOpacity: 1,
            //                     //     pane: 'pointPane'
            //                     // });
            //                     // return L.marker(latlng, { 
            //                     //     icon: cave, pane: 'pointPane' });
            //                     return L.marker(latlng, {
            //                         icon: L.divIcon({
            //                             className: "custom-icon",
            //                             html: cave,
            //                             iconSize: [40, 40]
            //                         })
            //                     });
            //             }
            //         },
            //         // set onclick events for each feature based on geometry type (e.g., point, polygon) and display available images in modal
            //         onEachFeature: (feature, layer) => {
            //             layer.on('click', async () => {
            //                 // TODO - check JSON properties (get list of keys)
            //                 findImagesSet_v2('/api/photos/', feature.properties.PID).then(images => {
            //                     document.getElementById("point-clicked").innerText = `${feature.properties.Place}`;
            //                     document.getElementById("text-description").innerText = images.description || '';

            //                     if (images.paths != null) {
            //                         displayImages_v3(images.paths);
            //                     } else {
            //                         console.log(`Sorry, could not find images :-(`);
            //                     }

            //                     modalDialog.show();
            //                 });
            //                 // getImageDescription_v2(feature.properties.id);
            //                 // getImageDescription_v2(feature.properties.PID);
            //             });
            //         }
            //     });

            //     pointLayers[id] = ptLayer;
            //     ptLayer.addTo(map);
            //     ptLayer.bringToFront();

            // }); // end of forEach loop
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