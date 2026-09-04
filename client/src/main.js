// main.js 

// libraries, extensions, plugins
import L from 'leaflet';
import Viewer from 'viewerjs';

// styles
import 'viewerjs/dist/viewer.css';
import 'leaflet/dist/leaflet.css';

import { MapContainer } from './components/MapContainer.js';

// components
import { NavBar } from './components/NavBar2.js';
import { About } from './components/About2.js';
import { Legend } from './components/Legend4.js';
import { Tutorial } from './components/Tutorial2.js';
import { Gallery } from './components/Gallery2.js';
import { Dock } from './components/Dock2.js';
import { LayerToggle } from './components/LayerToggle.js';
import { TransparencySlider } from './components/TransparencySlider.js';

// constants 
import { API_PHOTOS_URL } from './constants/index.js';
import { aerial, cave, sinkhole } from './constants/index.js';


/* ------------------------------------------------------------
initialize and add components to #app
------------------------------------------------------------ */

const app = document.getElementById("app");

app.append(NavBar(), MapContainer(), Dock());

document.body.append(About(), Tutorial(), Legend(), Gallery(), LayerToggle(),  TransparencySlider());


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

// use as default map tiles
ewtm.addTo(map);

let currentBaseMap = ewtm;


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

// modal element instance of photo gallery
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

modalElement.addEventListener('shown.bs.modal', () => {
    console.log("Modal gallery is open")
});

modalElement.addEventListener('hidden.bs.modal', () => {
    console.log("Modal gallery is hidden");
});

// for photo lightbox
let viewer;

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
event listeners for dock buttons
------------------------------------------------------------ */

lucide.createIcons();

document.getElementById('zoom-in-btn').addEventListener('click', () => {
    map.zoomIn();
});

document.getElementById('zoom-out-btn').addEventListener('click', () => {
    map.zoomOut();
});

document.getElementById('recenter-btn').addEventListener('click', () => {
    map.setView(center, defaultZoom);
});


/* ------------------------------------------------------------
event listener for location button (on dock)
------------------------------------------------------------ */

let locateMarker = null;
let locateCircle = null;

const locateIcon = L.divIcon({
  className: 'locate-marker-icon',
  html: `
    <div class="locate-marker-wrap">
      <div class="locate-marker-pulse"></div>
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="8" fill="#4285F4" stroke="#fff" stroke-width="3"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const locateBtn = document.getElementById('locate-btn');

locateBtn.addEventListener('click', () => {
    map.locate({
        setView: true, maxZoom: 15
    });
});

map.on('locationfound', function(e) {
    if (locateMarker) { map.removeLayer(locateMarker); }
    if (locateCircle) { map.removeLayer(locateCircle); }

    locateMarker = L.marker(e.latlng, { icon: locateIcon }).addTo(map);
    locateCircle = L.circleMarker(e.latlng, e.ccuracy / 2).addTo(map);
});

map.on('locationerror', function(e) {
    alert("User denied location")
});


/* ------------------------------------------------------------
global fallback: explicitly close tooltips
------------------------------------------------------------ */

// map.on('mousemove', function (e) {
//     if(!e.originalEvent.target.closest('path .leaflet-marker-icon')) {
//         map.eachLayer(l => l.closeTooltip && l.closeTooltip());
//     }
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
        // console.log('injectDefs: SVG not found yet');
        return;
    }

    let defs = svg.querySelector("defs");

    if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        svg.insertBefore(defs, svg.firstChild)
    }

    defs.innerHTML = pattern_defs;

    // confirm function run
    // console.log("Ran injectDefs");
}

map.on("layeradd zoomend moveend viewreset", injectDefs);

// style function
function addPatternStyle(feature) {
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

    return darkerHexcode;
}


/* ------------------------------------------------------------
layer groups for polygons
------------------------------------------------------------ */

const featureLayers = {
    allLayers: L.featureGroup(),
    polygonLayers: {
        poly0_all: L.featureGroup(),
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
        point0_all: L.featureGroup(),
        point1: L.featureGroup(),
        point2: L.featureGroup(),
        point3: L.featureGroup(),
        point4: L.featureGroup(),
        point5: L.featureGroup()
    },
    boundaryLayers: {
        boundary0_all: L.featureGroup(),
        boundary1: L.featureGroup(),
        boundary2: L.featureGroup(),
        boundary3: L.featureGroup()
    }
};


/* ------------------------------------------------------------
functions for leaflet map layers, image retrieval
------------------------------------------------------------ */

let layer_transparency_level = 1;

// params:
// data (url to geojson)
// ftype (feature type: 1 = polygon, 2 = boundary, 3 = point)
function getLayers(data, ftype) {
    fetch(data)
    .then(response => response.json())
    .then(data => {

        // polygons
        if (ftype === 1) {
            const polyLayer = L.geoJSON(data, {
                pane: 'polygonPane',
                // style polygons
                style: (feature) => {
                    if (patterned_polygons.has(Number(feature.properties.SID))) {
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
                }, //end of style property

                // set onclick events for each feature based on geometry type (e.g., point, polygon) and display available images in modal
                onEachFeature: (feature, layer) => {

                    // add to polygon layer group
                    layer.addTo(featureLayers.allLayers); // to all feature layers 
                    layer.addTo(featureLayers.polygonLayers.poly0_all); // to all polygon layers

                    // GID example: G26 or G01
                    switch (feature.properties.SID) {
                        case 1:
                            layer.addTo(featureLayers.polygonLayers.poly1_Tf);
                            break;
                        case 2:
                            layer.addTo(featureLayers.polygonLayers.poly2_Ta);
                            break;
                        case 3:
                            layer.addTo(featureLayers.polygonLayers.poly3_Tam);
                            break;
                        case 4:
                            layer.addTo(featureLayers.polygonLayers.poly4_Tt);
                            break;
                        case 5:
                            layer.addTo(featureLayers.polygonLayers.poly5_Tug);
                            break;
                        case 6:
                            layer.addTo(featureLayers.polygonLayers.poly6_Tus);
                            break;
                        case 7:
                            layer.addTo(featureLayers.polygonLayers.poly7_Tub);
                            break;
                        case 8:
                            layer.addTo(featureLayers.polygonLayers.poly8_Tud);
                            break;
                        case 9:
                            layer.addTo(featureLayers.polygonLayers.poly9_Tu);
                            break;
                        case 10:
                            layer.addTo(featureLayers.polygonLayers.poly10_Tm);
                            break;
                        case 11:
                            layer.addTo(featureLayers.polygonLayers.poly11_Tb);
                            break;
                        case 12:
                            layer.addTo(featureLayers.polygonLayers.poly12_Tbl);
                            break;
                        case 13:
                            layer.addTo(featureLayers.polygonLayers.poly13_Tj);
                            break;
                        case 14:
                            layer.addTo(featureLayers.polygonLayers.poly14_Tal);
                            break;
                        case 15:
                            layer.addTo(featureLayers.polygonLayers.poly15_QTmp);
                            break;
                        case 16:
                            layer.addTo(featureLayers.polygonLayers.poly16_QTmh);
                            break;
                        case 17:
                            layer.addTo(featureLayers.polygonLayers.poly17_QTma);
                            break;
                        case 18:
                            layer.addTo(featureLayers.polygonLayers.poly18_QTmf);
                            break;
                        case 19:
                            layer.addTo(featureLayers.polygonLayers.poly19_QTmm);
                            break;
                        case 20:
                            layer.addTo(featureLayers.polygonLayers.poly20_QTmd);
                            break;
                        case 21:
                            layer.addTo(featureLayers.polygonLayers.poly21_QTmr);
                            break;
                        case 22:
                            layer.addTo(featureLayers.polygonLayers.poly22_Qt);
                            break;
                        case 23:
                            layer.addTo(featureLayers.polygonLayers.poly23_Qal);
                            break;
                        case 24:
                            layer.addTo(featureLayers.polygonLayers.poly24_Qrm);
                            break;
                        case 25:
                            layer.addTo(featureLayers.polygonLayers.poly25_Qrb);
                            break;
                        default:
                            layer.addTo(featureLayers.polygonLayers.poly26_Qaf);
                            break;
                        }; // end of switch statement

                    // add tooltip with polygon label on mouse hover
                    layer.bindTooltip(
                        `${feature.properties.MapUnit} (${feature.properties.UnitAbr})`,
                        {
                            sticky: true,
                            direction: 'top',
                            opacity: 0.9,
                            className: 'polygon-tooltip',
                        }
                    );

                    // layer click event
                    layer.on('click', async () => {
                        // TODO - clean this up to JS-focused creation instead of raw HTML and strings
                        const formation = feature.properties.Formation.trim() === "" ? "" : `<p>Formation: ${feature.properties.Formation}</p>`;

                        document.getElementById("text-info").innerHTML = /*html*/ `
                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <svg viewBox="0 0 200 200" preserveAspectRatio="none" class="img-fluid rounded-start" role="img" aria-label="Decorative striped rectangle" style="width: 100%; height: 100%; display: block;">
                                        <rect x="0" y="0" width="200" height="200" fill="#${feature.properties.Hex}"></rect>
                                    </svg>
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title text-font-style-roboto-slab">
                                        ${feature.properties.MapUnit} (${feature.properties.UnitAbr})
                                    </h5>
                                    <span class="legend-badge badge rounded-pill">
                                        <i class="bi bi-clock-history"></i>
                                        ${feature.properties.Epoch}
                                    </span>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                                    <ul class="list-group list-group-horizontal w-100">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            ${(feature.properties.sqmi).toFixed(3)} sq mi
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            ${(feature.properties.sqKm).toFixed(3)} sq Km
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            ${(feature.properties.Area_acres).toFixed(3)} acres
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            ${(feature.properties.Area_ha).toFixed(3)} hectres
                                        </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                        `;

                        // show loading screen for image retrieval first and open the modal dialog
                        skeletonDisplay();
                        modalDialog.show();

                        // TODO - check JSON properties (get list of keys)
                        findImagesSet_v2(API_PHOTOS_URL, feature.properties.GID).then(images => {
                            // document.getElementById("point-clicked").innerText = `Photo Gallery`;
                            // document.getElementById("text-description").innerText = images.description || '';

                            if (images.paths != null) {
                                displayImages_v3(images.paths);
                            } else {
                                console.log(`Sorry, could not find images :-(`);
                            }
                        });
                        // getImageDescription_v2(feature.properties.id);
                        // getImageDescription_v2(feature.properties.PID);
                    });

                    layer.on({
                        mouseover(e) {
                            // e.target.setStyle({
                            //     weight: 4,
                            //     color: `${darkenHex(feature.properties.Hex)}`,
                            //     opacity: layer_transparency_level,
                            //     fillOpacity: layer_transparency_level,
                            //     // fillColor: `${darkenHex(feature.properties.Hex)}`,
                            // });

                            layer.bringToFront();
                            // console.log(feature.properties.UnitAbr);
                        },
                        mouseout(e) {
                            // polyLayer.resetStyle(e.target);
                            layer.closeTooltip();
                        }
                    });

                    // explicitly close tooltip
                    layer.on('remove', () => {
                        layer.closeTooltip();
                    });

                } // end of onEachFeature property
            }); // end of L.geoJSON

            injectDefs();

        // boundaries
        } else if (ftype === 2) {
            const bLayer = L.geoJSON(data, {
                pane: 'linePane',
                style: (feature) => {
                    return  {
                        color: getLineColor(feature.properties.Code1),
                        weight: 1,
                        dashArray: getLineType(feature.properties.Code1)
                    }
                },
                onEachFeature: (feature, layer) => {
                    layer.addTo(featureLayers.allLayers); // add to all feature layers 
                    layer.addTo(featureLayers.boundaryLayers.boundary0_all); // add to all boundaries 

                    switch (feature.properties.Code1) {
                        case 0:
                            layer.addTo(featureLayers.boundaryLayers.boundary1);
                            break;
                        case 1: 
                            layer.addTo(featureLayers.boundaryLayers.boundary2);
                            break;
                        default:
                            layer.addTo(featureLayers.boundaryLayers.boundary3);
                            break;
                    }
                }
            });

        // points
        } else if (ftype === 3) {
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
                                fillOpacity: 1
                            });
                        case 1:
                            return L.circleMarker(latlng, {
                                radius: 8,
                                fillColor: getColor(feature.properties.SCode),
                                color: "#000",
                                weight: 2,
                                fillOpacity: 1
                            });
                        case 2:
                            return L.marker(latlng, {
                                icon: L.divIcon({
                                    className: "custom-icon",
                                    html: sinkhole,
                                    iconSize: [30, 30]
                                })
                            });
                        case 3:
                            return L.marker(latlng, {
                                icon: L.divIcon({
                                    className: "custom-icon",
                                    html: aerial,
                                    iconSize: [50, 50]
                                })
                            });
                        case 4:
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

                    // add tooltip with polygon label on mouse hover
                    layer.bindTooltip(
                        `${feature.properties.Place}`,
                        {
                            sticky: true,
                            direction: 'top',
                            opacity: 0.9,
                            className: 'polygon-tooltip',
                        }
                    );

                    layer.on('click', async () => {
                        // clear #text-info contents 
                        document.getElementById("text-info").replaceChildren();
                        document.getElementById("text-info").innerHTML = /*html*/ `
                        <h5>${feature.properties.Place}</h5>
                        `;

                        // TODO - check JSON properties (get list of keys)
                        findImagesSet_v2(API_PHOTOS_URL, feature.properties.PID).then(images => {
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
                    });// end of layer on click listener 

                    // explicitly close tooltip
                    layer.on('remove', () => {
                        layer.closeTooltip();
                    });

                    layer.on('mouseout', () => {
                        layer.closeTooltip();
                    })

                    layer.addTo(featureLayers.allLayers); // add to all feature layers 
                    layer.addTo(featureLayers.pointLayers.point0_all); // add to all point layers 

                    switch (feature.properties.SCode) {
                        case 0:
                            layer.addTo(featureLayers.pointLayers.point1);
                            break;
                        case 1:
                            layer.addTo(featureLayers.pointLayers.point2);
                            break;
                        case 2:
                            layer.addTo(featureLayers.pointLayers.point3);
                            break;
                        case 3:
                            layer.addTo(featureLayers.pointLayers.point4);
                            break;
                        default:
                            layer.addTo(featureLayers.pointLayers.point5);
                            break;
                    }

                } // end of onEachFeature property
            });
        } // end of conditional for point
    }); // end of fetch call
} // end of getLayers function


/* ------------------------------------------------------------
image retrieval functions
------------------------------------------------------------ */

// for polygons (to implement for points as well)
async function findImagesSet_v2(apiUrl, searchId) {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
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
                // document.getElementById("text-description").innerText = `${descriptions[i].text}`;
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

        document.getElementById("num-photos").innerHTML = `<i class="bi bi-images"></i> ${images.length} ${plural} available for this feature`;

        let loadedImgs = [];
        let imgsLoaded = 0;

        // new code to display images gallery-style (using viewer.js)
        images.forEach((imageUrl) => {
            const img = new Image();
            img.src = imageUrl;

            img.decode()
            .then(() => {
                imgsLoaded++;
                if (imgsLoaded === images.length) {
                    displayImages_v3_sub(loadedImgs);
                }
            })
            .catch(() => {
                imgsLoaded++;
                if (imgsLoaded === images.length) {
                    displayImages_v3_sub(loadedImgs);
                }
            })

            loadedImgs.push(img);
        });
    } else {
        document.getElementById("num-photos").innerText = "";
        gallery.innerHTML = /*html*/ `<p style="font-style: none; font-size: 20px;">Sorry, there are currently no photos available for this feature.</p>`;
    }
}

function displayImages_v3_sub(images) {
    images.forEach((img, index) => {
        img.classList.add("gallery-img");

        setTimeout(() => {
            img.classList.add("loaded"); // apply animation class
        }, index * 300); // staggered animation effect

        gallery.append(img);
    });

    // initialize viewer here
    initializeViewer();
}

// loading screen to show before the actual photos 
function skeletonDisplay() {

    clearGallery();

    document.getElementById("num-photos").innerHTML = /*html*/ `
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Loading photos...</span>
    `;

    const skeleton = document.createElement("div");
    skeleton.className = "row g-3";
    skeleton.innerHTML = /*html*/ `
    ${[0, 1, 2].map(() => `<div class="col-3" style="justify-content:center; align-items:center; flex:1;"> 
        <div class="skeleton" style="width:150px; height:150px;"></div>
        </div>`).join('')}
    </div>
    `;
    gallery.append(skeleton);
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
listeners for layer toggle component 
------------------------------------------------------------ */

// first, add all layers to map 
function addLayerObjectsToMap(layerGroup) { 
    Object.values(layerGroup).forEach(group => group.addTo(map));
}

document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => { 
        addLayerObjectsToMap(featureLayers.polygonLayers);
        addLayerObjectsToMap(featureLayers.pointLayers);
        addLayerObjectsToMap(featureLayers.boundaryLayers);
    }, 100); 
});


/* ------------------------------------------------------------
listeners for basemap radio btns
------------------------------------------------------------ */

document.getElementById("radio-osm").addEventListener("change", () => {
    map.removeLayer(currentBaseMap);
    currentBaseMap = ewtm;
    currentBaseMap.addTo(map);
});

document.getElementById("radio-esri-world-img").addEventListener("change", () => {
    map.removeLayer(currentBaseMap);
    currentBaseMap = ewi;
    currentBaseMap.addTo(map);
});

document.getElementById("radio-esri-gray-canvas").addEventListener("change", () => {
    map.removeLayer(currentBaseMap);
    currentBaseMap = ewgc;
    currentBaseMap.addTo(map);
});


/* ------------------------------------------------------------
listeners for feature group reset checkboxes and btns
------------------------------------------------------------ */

// checkboxes - feature group reset 
document.getElementById("reset-polygons").addEventListener("change", (event) => {
    const single_layers_toggle = document.querySelectorAll('#layers-panel-one > .layer-row > input[type="checkbox"]');

    if (event.target.checked) {
        Object.values(featureLayers.polygonLayers).forEach((layer) => {
            layer.addTo(map);
        });

        // mark all individual checkboxes as checked 
        single_layers_toggle.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        Object.values(featureLayers.polygonLayers).forEach((layer) => {
            map.removeLayer(layer);
        });

        // uncheck all individual checkboxes 
        single_layers_toggle.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});

document.getElementById("reset-points").addEventListener("change", (event) => {
    const single_layers_toggle = document.querySelectorAll('#layers-panel-two > .layer-row > input[type="checkbox"]');

    if (event.target.checked) {
        Object.values(featureLayers.pointLayers).forEach((layer) => {
            layer.addTo(map);
            layer.bringToFront()
        });

        // mark all individual checkboxes as checked 
        single_layers_toggle.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        Object.values(featureLayers.pointLayers).forEach((layer) => {
            map.removeLayer(layer);
        });

        // uncheck all individual checkboxes 
        single_layers_toggle.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});

document.getElementById("reset-boundaries").addEventListener("change", (event) => {
    const single_layers_toggle = document.querySelectorAll('#layers-panel-three > .layer-row > input[type="checkbox"]');

    if (event.target.checked) {
        Object.values(featureLayers.boundaryLayers).forEach((layer) => {
            layer.addTo(map);
            layer.bringToFront();
        });

        single_layers_toggle.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        Object.values(featureLayers.boundaryLayers).forEach((layer) => {
            map.removeLayer(layer);
        });

        // uncheck all individual checkboxes 
        single_layers_toggle.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});

// btns - reset all features, remove layers 
document.getElementById("reset-all-layers").addEventListener("click", () => {
    Object.values(featureLayers.polygonLayers).forEach((layer) => {
        layer.addTo(map);
    });
    Object.values(featureLayers.boundaryLayers).forEach((layer) => {
        layer.addTo(map);
    });
    Object.values(featureLayers.pointLayers).forEach((layer) => {
        layer.addTo(map);
        layer.bringToFront();
    });

    const layer_toggle_rows = document.querySelectorAll('.layer-row > input[type="checkbox"]');

    layer_toggle_rows.forEach(checkbox => {
        checkbox.checked = true;
    });

    const reset_layers_toggle = document.querySelectorAll('.reset-layers-checkbox > input[type="checkbox"]');

    reset_layers_toggle.forEach(checkbox => {
        checkbox.checked = true;
    });
});

document.getElementById("remove-all-layers").addEventListener("click", () => {
    Object.values(featureLayers.polygonLayers).forEach((layer) => {
        map.removeLayer(layer);
    });
    Object.values(featureLayers.boundaryLayers).forEach((layer) => {
        map.removeLayer(layer);
    });
    Object.values(featureLayers.pointLayers).forEach((layer) => {
        map.removeLayer(layer);
    });

    const layer_toggle_rows = document.querySelectorAll('.layer-row > input[type="checkbox"]');

    layer_toggle_rows.forEach(checkbox => {
        checkbox.checked = false;
    });

    const reset_layers_toggle = document.querySelectorAll('.reset-layers-checkbox > input[type="checkbox"]');

    reset_layers_toggle.forEach(checkbox => {
        checkbox.checked = false;
    });
}); 


/* ------------------------------------------------------------
listeners for polygon checkboxes
------------------------------------------------------------ */

document.getElementById("toggle-polygon-1").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly1_Tf;
    if (event.target.checked & !map.hasLayer(target_layer)) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-2").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly2_Ta;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-3").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly3_Tam;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-4").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly4_Tt;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-5").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly5_Tug;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-6").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly6_Tus;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-7").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly7_Tub;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-8").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly8_Tud;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-9").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly9_Tu;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-10").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly10_Tm;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-11").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly11_Tb;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-12").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly12_Tbl;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-13").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly13_Tj;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-14").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly14_Tal;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-15").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly15_QTmp;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-16").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly16_QTmh;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-17").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly17_QTma;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-18").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly18_QTmf;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-19").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly19_QTmm;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-20").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly20_QTmd;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-21").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly21_QTmr;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-22").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly22_Qt;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-23").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly23_Qal;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-24").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly24_Qrm;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-25").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly25_Qrb;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-polygon-26").addEventListener("change", (event) => {
    let target_layer = featureLayers.polygonLayers.poly26_Qaf;
    if (event.target.checked) {
        target_layer.addTo(map);
    } else {
        map.removeLayer(target_layer);
    }
});


/* ------------------------------------------------------------
listeners for point checkboxes
targets #toggle-layer-num
------------------------------------------------------------ */

document.getElementById("toggle-point-0").addEventListener("change", (event) => {
    let target_layer = featureLayers.pointLayers.point1;
    if (event.target.checked) {
        target_layer.addTo(map);
        target_layer.bringToFront();
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-point-1").addEventListener("change", (event) => {
    let target_layer = featureLayers.pointLayers.point2;
    if (event.target.checked) {
        target_layer.addTo(map);
        target_layer.bringToFront();
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-point-sinkhole").addEventListener("change", (event) => {
    let target_layer = featureLayers.pointLayers.point3;
    if (event.target.checked) {
        target_layer.addTo(map);
        target_layer.bringToFront();
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-point-aerial").addEventListener("change", (event) => {
    let target_layer = featureLayers.pointLayers.point4;
    if (event.target.checked) {
        target_layer.addTo(map);
        target_layer.bringToFront();
    } else {
        map.removeLayer(target_layer);
    }
});

document.getElementById("toggle-point-cave").addEventListener("change", (event) => {
    let target_layer = featureLayers.pointLayers.point5;
    if (event.target.checked) {
        target_layer.addTo(map);
        target_layer.bringToFront();
    } else {
        map.removeLayer(target_layer);
    }
});


/* ------------------------------------------------------------
listeners for point checkboxes
targets #toggle-boundary-num
------------------------------------------------------------ */

document.getElementById("toggle-boundary-0").addEventListener("change", (event) => {
    const layer = featureLayers.boundaryLayers.boundary1;
    if (event.target.checked) {
        if (!map.hasLayer(layer)) {
            layer.addTo(map);
        }
    } else {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    }
});

document.getElementById("toggle-boundary-1").addEventListener("change", (event) => {
    const layer = featureLayers.boundaryLayers.boundary2;
    if (event.target.checked) {
        if (!map.hasLayer(layer)) {
            layer.addTo(map);
        }
    } else {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    }
});

document.getElementById("toggle-boundary-2").addEventListener("change", (event) => {
    const layer = featureLayers.boundaryLayers.boundary3;
    if (event.target.checked) {
        if (!map.hasLayer(layer)) {
            layer.addTo(map);
        }
    } else {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    }
});


function checkLayerExistence(layer) {
    if (!map.hasLayer(layer)) {
        layer.addTo(map);
    } else {
        map.removeLayer(layer);
    }
}


/* ------------------------------------------------------------
listeners for polygon transparency slider
------------------------------------------------------------ */

const transparency_slider = document.getElementById('transparency-range-slider');
const transparency_slider_label = document.getElementById("range-value-label");

function updateSliderColor() {
    const value = Number(transparency_slider.value);
    const min = Number(transparency_slider.min);
    const max = Number(transparency_slider.max);
    const percent = ((value - min) / (max - min)) * 100;

    transparency_slider.style.setProperty('--fill-percent', `${percent}%`);
    transparency_slider_label.textContent = `${value}%`
}

// event listener for slider 
transparency_slider.addEventListener('input', (event) => {
    updateSliderColor();

    layer_transparency_level = event.target.value / 100;
    featureLayers.polygonLayers.poly0_all.setStyle({ 
        fillOpacity: layer_transparency_level, 
        pacity: layer_transparency_level });
});

// individual transparency percentages (labels under slider input)
document.getElementById("poly-layer-0-pct-trans").addEventListener("click", () => {
    layer_transparency_level = 0;
    transparency_slider.value = 0;
    updateSliderColor();

    transparency_slider_label.innerText = "0%";
    featureLayers.polygonLayers.poly0_all.setStyle({
        fillOpacity: layer_transparency_level, 
        opacity: layer_transparency_level 
    });
});

document.getElementById("poly-layer-25-pct-trans").addEventListener("click", () => {
    layer_transparency_level = 0 / 100;
    transparency_slider.value = 25;
    updateSliderColor();

    transparency_slider_label.innerText = "25%";
    featureLayers.polygonLayers.poly0_all.setStyle({
        fillOpacity: layer_transparency_level, 
        opacity: layer_transparency_level 
    });
});

document.getElementById("poly-layer-50-pct-trans").addEventListener("click", () => {
    layer_transparency_level = 50 / 100;
    transparency_slider.value = 50;
    updateSliderColor();

    transparency_slider_label.innerText = "50%";
    featureLayers.polygonLayers.poly0_all.setStyle({
        fillOpacity: layer_transparency_level, 
        opacity: layer_transparency_level 
    });
});

document.getElementById("poly-layer-75-pct-trans").addEventListener("click", () => {
    layer_transparency_level = 75 / 100;
    transparency_slider.value = 75;
    updateSliderColor();

    transparency_slider_label.innerText = "75%";
    featureLayers.polygonLayers.poly0_all.setStyle({
        fillOpacity: layer_transparency_level, 
        opacity: layer_transparency_level 
    });
});

document.getElementById("poly-layer-100-pct-trans").addEventListener("click", () => {
    layer_transparency_level = 1;
    transparency_slider.value = 100;
    updateSliderColor();

    transparency_slider_label.innerText = "100%";
    featureLayers.polygonLayers.poly0_all.setStyle({
        fillOpacity: layer_transparency_level, 
        opacity: layer_transparency_level 
    });
});

// restore transparency to original btn (100%) 
const restore_transparency_btn = document.getElementById("restore-transparency-btn");

restore_transparency_btn.addEventListener("click", () => {
    layer_transparency_level = 1;
    transparency_slider.value = 100;
    updateSliderColor();

    transparency_slider_label.innerText = "100%";

    featureLayers.polygonLayers.poly0_all.setStyle({
        fillOpacity: layer_transparency_level, 
        opacity: layer_transparency_level 
    });
});