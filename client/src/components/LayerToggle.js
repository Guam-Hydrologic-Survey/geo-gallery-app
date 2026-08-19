/* 
Legend.js
Description: Creates the Legend component
*/

export function LayerToggle() {
    console.log("Added Legend component");

    const layer_toggle = document.createElement("div");

    layer_toggle.className = "offcanvas offcanvas-start";
    layer_toggle.tabIndex = -1;
    layer_toggle.id = "layer-toggle-offcanvas";

    layer_toggle.setAttribute("data-bs-scroll", "true");
    layer_toggle.setAttribute("data-bs-backdrop", "false");

    // layer_toggle header 
    const header = document.createElement("div");
    header.className = "offcanvas-header";
    header.innerHTML = /*html*/ `
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Layers</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    `;

    // layer_toggle contents 
    const contents = document.createElement("div");
    contents.className = "offcanvas-body";
    contents.id = "layer-toggle-contents";

    layer_toggle.append(header, LayerToggleContents(contents));

    return layer_toggle; 
}

function LayerToggleContents(layer_toggle) {

    const geo = "/data/GeologicUnits.json";
    const pts = "/data/PointUnits.json";
    const bndry = "/data/BoundaryUnits.json";

    const patterned_polygons = new Set([4, 9, 17]);

    const layer_tabs = document.createElement("ul");
    layer_tabs.className = "nav nav-tabs";
    layer_tabs.id = "layer_tabs";

    layer_tabs.innerHTML = /*html*/ `
    <li class="nav-item">
        <a class="nav-link active" data-bs-toggle="tab" href="#panel-one">Geologic Map</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#panel-two">Points</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#panel-three">Boundaries</a>
    </li>
    `;

    const layer_tabs_content = document.createElement("div");
    layer_tabs_content.className = "tab-content mt-3";

    const polygon_tab = document.createElement("div");
    polygon_tab.className = "tab-pane fade show active";
    polygon_tab.id = "layers-panel-one";

    const point_tab = document.createElement("div");
    point_tab.className = "tab-pane fade";
    point_tab.id = "layers-panel-two";

    const boundaries_tab = document.createElement("div");
    boundaries_tab.className = "tab-pane fade";
    boundaries_tab.id = "layers-panel-three";

    // retrieve json containing key and descriptions for polygons 
    fetch(geo)
    .then(response => response.json())
    .then(contents => { 

        const geologic_units = contents.units;

        const HEIGHT = 40;
        const WIDTH = 40;

        // initialize variable containing layer_toggle row contents 
        let layer_row;

        for (let i = 0; i < geologic_units.length; i++) {

            if (patterned_polygons.has(geologic_units.number)) {
                switch (geologic_units.number) {
                    case 4:
                        layer_row = /*html*/ `
                        <div class="layer-row">
                            <div class="layer-toggle">
                                <div class="layer-swatch">
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
                                <div class="layer-key">
                                    <p class="layer-label text-bold-weight">${geologic_units[i].label}</p>
                                    <p class="layer-description">${geologic_units[i].description}</p>
                                </div>
                            </div>
                            <input class="form-check-input" type="checkbox" id="toggle-layer-${geologic_units.label}"/>
                        </div>
                        `;
                        break;
                    case 9:
                        layer_row = /*html*/ `
                        <div class="layer-row">
                            <div class="layer-toggle">
                                <div class="layer-swatch">
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
                                <div class="layer-key">
                                    <p class="layer-label text-bold-weight">${geologic_units[i].label}</p>
                                    <p class="layer-description">${geologic_units[i].description}</p>
                                </div>
                            </div>
                            <input class="form-check-input" type="checkbox" id="toggle-layer-${geologic_units.label}"/>
                        </div>
                        `;
                        break;
                    case 17:
                        layer_row = /*html*/ `
                        <div class="layer-row">
                            <div class="layer-toggle">
                                <div class="layer-swatch">
                                    <svg viewBox="0 0 ${HEIGHT} ${WIDTH}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                        <pattern id="" x="0" y="0" width ="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(315)">
                                            <rect width="14" height="14" fill="#ade9ff"/>
                                            <line x1="0" y1="0" x2="0" y2="14" stroke="#fff" stroke-width="4"/>
                                        </pattern>
                                        <rect width="${WIDTH}" height="${HEIGHT}" fill="#${geologic_units[i].hexcode}" />
                                    </svg>
                                </div>
                                <div class="layer-key">
                                    <p class="layer-label text-bold-weight">${geologic_units[i].label}</p>
                                    <p class="layer-description">${geologic_units[i].description}</p>
                                </div>
                            </div>
                            <input class="form-check-input" type="checkbox" id="toggle-layer-${geologic_units.label}"/>
                        </div>
                        `;
                        break;
                }
            } else {
                layer_row = /*html*/ `
                <div class="layer-row">
                    <div class="layer-toggle">
                        <div class="layer-swatch">
                            <svg viewBox="0 0 ${HEIGHT} ${WIDTH}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                <rect width="${WIDTH}" height="${HEIGHT}" fill="#${geologic_units[i].hexcode}" />
                            </svg>
                        </div>
                        <div class="layer-key">
                            <p class="layer-label text-bold-weight">${geologic_units[i].label}</p>
                            <p class="layer-description">${geologic_units[i].description}</p>
                        </div>
                    </div>
                    <input class="form-check-input" type="checkbox" id="toggle-layer-${geologic_units[i].label}"/>
                </div>
                `;
            } // end of conditional statement 

            polygon_tab.insertAdjacentHTML("beforeend", layer_row);
        } // end of for loop 
    }); // end fetch for geo units

    // retrieve json containing key and descriptions for points
    fetch(pts)
    .then(response => response.json())
    .then(contents => {

        const point_units = contents.units;

        const HEIGHT = 40;
        const WIDTH = 40;

        // initialize variable containing layer_toggle row contents 
        let layer_row;

        for (let i = 0; i < point_units.length; i++) {
            layer_row = /*html*/ `
            <div class="layer-row">
                <div class="layer-toggle">
                    <div class="layer-swatch">
                        <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="340" cy="340" r="180" fill="#${point_units[i].hexcode}" stroke="black" stroke-width="2" vector-effect="non-scaling-stroke"/>
                        </svg>
                    </div>
                    <div class="layer-key">
                        <p class="layer-label text-bold-weight">${point_units[i].label}</p>
                        <p class="layer-description">${point_units[i].description}</p>
                    </div>
                </div>
                <input class="form-check-input" type="checkbox" id="toggle-layer-${point_units[i].label}"/>
            </div>`;

            point_tab.insertAdjacentHTML("beforeend", layer_row);
        } // end of for loop 

        const sinkhole = /* html */ `
        <div class="layer-row">
            <div class="layer-toggle">
                <div class="layer-swatch">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="1191 229 2021 2021"><g fill="none" stroke="#000" stroke-width="37"><path d="M1210.5 1238.5h330M2200.5 248.5v330M1496.5 537.5l231 231M2899.5 535.5l-231 231M2690.5 1713.5l231 231M2200.5 1901.5v330M2860.5 1238.5h330M1721.5 1685.5l-231 231M1210.5 1238.5c0-546.8 443.2-990 990-990s990 443.2 990 990-443.2 990-990 990-990-443.2-990-990Z"/></g></svg>
                </div>
                <div class="layer-key">
                    <p class="layer-label text-bold-weight">Sinkhole</p>
                    <p class="layer-description"></p>
                </div>
                <input class="form-check-input" type="checkbox" id=""/>
            </div>
        </div>
        `;

        const cave = /* html */ `
        <div class="layer-row">
            <div class="layer-toggle">
                <div class="layer-swatch">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2884 2012"><path fill="#aeaeae" stroke="#000" stroke-width="37" d="M147.5 1977.8 191 1640l204-212.2 204.9-255.7 159.5-321.8 96.3-233.7 103.1-123.8L1103.2 321 1220 190.4l82.6-89.4 130.6-82.5h110l158.1 13.7 75.7 103.2 89.3 185.6 156.1 206.9 15.8 40.6 111.2 173.2 146.3 126 62.6 199 129.3 192.2 59.4 182.6 173.1 171.2 5.7 138.2 27.5 110 41.2 130.6z"/><path fill="#3a3a3a" stroke="#000" stroke-linecap="round" stroke-width="37" d="m937.8 1228 492.6-549.5 270.3 9.4 413.4 566.5 48.4 280.3-83.6 448.5-1235.4 9.3-73-374.7Z"/><path fill="#747474" stroke="#747474" stroke-linecap="round" stroke-width="18" d="M1124.9 1020.2c-.7 64.1-1.3 139.8-1.9 203.8l36-61.8 5.2-128.8 10.3-61.8 5.1 77.3 20.6 25.7 5.2-133.9 46.3 56.6L1262 884"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-width="37" d="m934.8 1227 492.6-549.5 270.3 9.4 413.4 566.5 48.4 280.3-83.6 448.5-1235.4 9.3-73-374.7Z"/><path fill="#aeaeae" stroke="#000" stroke-linecap="round" stroke-width="37" d="M817.2 1992.5H28.5l73.2-165.2 28.1-103.2 81.3-144.5 14.4-6.9 233.9-48.2 65.1 27.5 178.8-27.5 81.3 34.4 105.7 13.8 40.7 110.1 16.2 68.8-24.3 55.1 40.6 96.3-48.8 89.5ZM1883.5 1984.9l976 6.6-26.4-102.2-39.5-112.1-36.3-138.5-9.9-26.4-46.2-56-23-16.5-112.2 23.1-79.1-56.1-75.8-3.3-75.9 9.9-42.8 33-118.7-42.9-99 26.4-115.4 145.1-42.8 154.9v82.5Z"/></svg>
                </div>
                <div class="layer-key">
                    <p class="layer-label text-bold-weight">Cave</p>
                    <p class="layer-description"></p>
                </div>
                <input class="form-check-input" type="checkbox" id=""/>
            </div>
        </div>
        `;

        const aerial = /* html */ `
        <div class="layer-row">
            <div class="layer-toggle">
                <div class="layer-swatch">
                    <!-- INSERT SVG CODE FOR AERIAL MARKER ICON -->
                </div>
                <div class="layer-key">
                    <p class="layer-label text-bold-weight">Aerial</p>
                    <p class="layer-description"></p>
                </div>
                <input class="form-check-input" type="checkbox" id=""/>
            </div>
        </div>
        `;

        // append custom icons to point tab 
        point_tab.insertAdjacentHTML("beforeend", sinkhole);
        point_tab.insertAdjacentHTML("beforeend", cave);
        point_tab.insertAdjacentHTML("beforeend", aerial);

    }); // end fetch for point units 

    // retrieve json containing key and descriptions for boundaries 
    fetch(bndry)
    .then(response => response.json())
    .then(contents => {

        const boundary_units = contents.units;

        const HEIGHT = 40;
        const WIDTH = 40;

        // initialize variable containing layer_toggle row contents 
        let layer_row;

        for (let i = 0; i < boundary_units.length; i++) {
            if (boundary_units[i].number != 1) { // solid lines  
                layer_row = /*html*/ `
                <div class="layer-row">
                    <div class="layer-toggle">
                        <div class="layer-swatch">
                            <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <line x1="2" y1="20" x2="38" y2="20" stroke="#${boundary_units[i].hexcode}" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="layer-key">
                            <p class="layer-label text-bold-weight">${boundary_units[i].label}</p>
                            <p class="layer-description">${boundary_units[i].description}</p>
                        </div>
                    </div>
                    <input class="form-check-input" type="checkbox" id="toggle-layer-${boundary_units[i].label}"/>
                </div>
                `;
            } else { // dashed lines
                layer_row = /*html*/ `
                <div class="layer-row">
                    <div class="layer-toggle">
                        <div class="layer-swatch">
                            <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <line x1="2" y1="20" x2="38" y2="20" stroke="#${boundary_units[i].hexcode}" stroke-width="2" stroke-dasharray="8 4" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="layer-key">
                            <p class="layer-label text-bold-weight">${boundary_units[i].label}</p>
                            <p class="layer-description">${boundary_units[i].description}</p>
                        </div>
                    </div>
                    <input class="form-check-input" type="checkbox" id="toggle-layer-${boundary_units[i].label}"/>
                </div>
                `;
            }

            boundaries_tab.insertAdjacentHTML("beforeend", layer_row);
        }
    }); // end fetch for boundary units 

    layer_tabs_content.append(polygon_tab, point_tab, boundaries_tab);

    // add tabs and tab content to overall layer_toggle contents 
    layer_toggle.append(layer_tabs, layer_tabs_content);

    return layer_toggle;
}