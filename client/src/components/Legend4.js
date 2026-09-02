/* 
Legend.js
Description: Creates the Legend component
*/

import { 
    sinkhole, cave, aerial,
    boundary_units, point_units, polygon_units
 } from "../constants/index.js";

export function Legend() {
    console.log("Added Legend component");

    const legend = document.createElement("div");

    legend.className = "offcanvas offcanvas-start";
    legend.tabIndex = -1;
    legend.id = "legend-offcanvas";

    legend.setAttribute("data-bs-scroll", "true");
    legend.setAttribute("data-bs-backdrop", "false");

    // legend header 
    const header = document.createElement("div");
    header.className = "offcanvas-header";
    header.innerHTML = /*html*/ `
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Legend</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    `;

    // legend contents 
    const contents = document.createElement("div");
    contents.className = "offcanvas-body";
    contents.id = "legend-contents";

    legend.append(header, LegendContents(contents));

    return legend; 
}


function LegendContents(legend) {
    const patterned_polygons = new Set([4, 9, 17]);

    const legend_tabs = document.createElement("ul");
    legend_tabs.className = "nav nav-tabs";
    legend_tabs.id = "legend_tabs";

    legend_tabs.innerHTML = /*html*/ `
    <li class="nav-item">
        <a class="nav-link active" data-bs-toggle="tab" href="#legend-panel-one">Geologic Map</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#legend-panel-two">Points</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#legend-panel-three">Boundaries</a>
    </li>
    `;

    const legend_tabs_content = document.createElement("div");
    legend_tabs_content.className = "tab-content mt-3";

    const polygon_tab = document.createElement("div");
    polygon_tab.className = "tab-pane fade show active";
    polygon_tab.id = "legend-panel-one";

    const point_tab = document.createElement("div");
    point_tab.className = "tab-pane fade";
    point_tab.id = "legend-panel-two";

    const boundaries_tab = document.createElement("div");
    boundaries_tab.className = "tab-pane fade";
    boundaries_tab.id = "legend-panel-three";

    const HEIGHT = 50;
    const WIDTH = 50;

    // initialize variable containing legend row contents 
    let layer_row;

    let pattern_id;

    // add polygon labels 
    for (let i = 0; i < polygon_units.length; i++) {
        if (patterned_polygons.has(polygon_units[i].number)) {
            switch (polygon_units[i].number) {
                case 4:
                    pattern_id = "tt-brown-stripes";
                    layer_row = /*html*/ `
                    <div class="legend-row">
                        <div class="legend-header">
                            <!-- <p>${i + 1}</p> -->
                            <div class="legend-header-column legend-swatch">
                                <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="${pattern_id}" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                            <rect width="12" height="12" fill="#${polygon_units[i].hexcode}"/>
                                            <line x1="0" y1="0" x2="0" y2="12" stroke="#fff" stroke-width="1.5"/>
                                        </pattern>
                                    </defs>
                                    <rect width="${WIDTH}" height="${HEIGHT}" rx="8" fill="url(#${pattern_id})" />
                                </svg>
                            </div>
                            <div class="legend-header-column legend-key">
                                <p class="legend-label text-bold-weight">${polygon_units[i].label}</p>
                                <p class="legend-description">${polygon_units[i].description}</p>
                            </div>
                        </div> <!-- end .legend-header -->

                        <div class="legend-body">
                            <span class="legend-badge badge rounded-pill">
                                <i class="bi bi-clock-history"></i>
                                ${polygon_units[i].epoch}
                            </span>
                            <p class="legend-paragraph">${polygon_units[i].paragraph}</p>
                        </div> <!-- end .legend-body -->
                    </div> <!-- end .legend-header -->
                    `;
                    break;
                case 9:
                    pattern_id = "tu-dots";
                    layer_row = /*html*/ `
                    <div class="legend-row">
                        <div class="legend-header">
                            <!-- <p>${i + 1}</p> -->
                            <div class="legend-header-column legend-swatch">
                                <svg viewBox="0 0 ${HEIGHT} ${WIDTH}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                    <pattern id="${pattern_id}" x="0" y="0" width="56" height="56"  patternUnits="userSpaceOnUse">
                                        <rect width="56" height="56" fill="#${polygon_units[i].hexcode}"/>
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
                                    <!-- <rect width="${WIDTH}" height="${HEIGHT}" fill="#${polygon_units[i].hexcode}" /> -->
                                    <rect width="${WIDTH}" height="${HEIGHT}" rx="8" fill="url(#${pattern_id})"/>
                                </svg>
                            </div>
                            <div class="legend-header-column legend-key">
                                <p class="legend-label text-bold-weight">${polygon_units[i].label}</p>
                                <p class="legend-description">${polygon_units[i].description}</p>
                            </div>
                        </div> <!-- end .legend-header -->

                        <div class="legend-body">
                            <span class="legend-badge badge rounded-pill" style="--bs-badge-bg: #7FDEFF; --bs-badge-color: #0d6efd;">
                                <i class="bi bi-clock-history"></i>
                                ${polygon_units[i].epoch}
                            </span>
                            <p class="legend-paragraph">${polygon_units[i].paragraph}</p>
                        </div> <!-- end .legend-body -->
                    </div> <!-- end .legend-header -->
                    `;
                    break;
                case 17:
                    pattern_id = "qtma-blue-stripes";
                    layer_row = /*html*/ `
                    <div class="legend-row">
                        <div class="legend-header">
                            <!-- <p>${i + 1}</p> -->
                            <div class="legend-header-column legend-swatch">
                                <svg viewBox="0 0 ${HEIGHT} ${WIDTH}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
                                    <pattern id="${pattern_id}" x="0" y="0" width ="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(315)">
                                        <rect width="14" height="14" fill="#${polygon_units[i].hexcode}"/>
                                        <line x1="0" y1="0" x2="0" y2="14" stroke="#fff" stroke-width="4"/>
                                    </pattern>
                                    <rect width="${WIDTH}" height="${HEIGHT}" rx="8" fill="url(#${pattern_id})"/>
                                </svg>
                            </div>
                            <div class="legend-header-column legend-key">
                                <p class="legend-label text-bold-weight">${polygon_units[i].label}</p>
                                <p class="legend-description">${polygon_units[i].description}</p>
                            </div>
                        </div> <!-- end .legend-header -->

                        <div class="legend-body">
                            <span class="legend-badge badge rounded-pill" style="--bs-badge-bg: #7FDEFF; --bs-badge-color: #0d6efd;">
                                <i class="bi bi-clock-history"></i>
                                ${polygon_units[i].epoch}
                            </span>
                            <p class="legend-paragraph">${polygon_units[i].paragraph}</p>
                        </div> <!-- end .legend-body -->
                    </div> <!-- end .legend-header -->
                    `;
                    break;
            } // end of switch
        } else {
            layer_row = /*html*/ `
            <div class="legend-row">
                <div class="legend-header">
                    <!-- <p>${i + 1}</p> -->
                    <div class="legend-header-column legend-swatch">
                        <svg viewBox="0 0 ${HEIGHT} ${WIDTH}" width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg"> 
                            <rect width="${WIDTH}" height="${HEIGHT}" rx="8" fill="#${polygon_units[i].hexcode}" />
                        </svg>
                    </div>
                    <div class="legend-header-column legend-key">
                        <p class="legend-label text-bold-weight">${polygon_units[i].label}</p>
                        <p class="legend-description">${polygon_units[i].description}</p>
                    </div>
                </div> <!-- end .legend-header -->

                <div class="legend-body">
                    <span class="legend-badge badge rounded-pill" style="--bs-badge-bg: #7FDEFF; --bs-badge-color: #0d6efd;">
                        <i class="bi bi-clock-history"></i>
                        ${polygon_units[i].epoch}
                    </span>
                    <p class="legend-paragraph">${polygon_units[i].paragraph}</p>
                </div> <!-- end .legend-body -->
            </div> <!-- end .legend-header -->
            `;
        } // end of conditional 

        polygon_tab.insertAdjacentHTML("beforeend", layer_row);
    } // end of for loop 

    // add point labels 
    for (let i = 0; i < point_units.length - 3; i++) {
        layer_row = /*html*/ `
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
            </div>`;

        point_tab.insertAdjacentHTML("beforeend", layer_row);
    }

    const point_sinkhole = /* html */ `
        <div class="legend-row">
            <div class="legend-toggle">
                <div class="legend-swatch">
                    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg" viewBox="1191 229 2021 2021"><g fill="none" stroke="#000" stroke-width="37"><path d="M1210.5 1238.5h330M2200.5 248.5v330M1496.5 537.5l231 231M2899.5 535.5l-231 231M2690.5 1713.5l231 231M2200.5 1901.5v330M2860.5 1238.5h330M1721.5 1685.5l-231 231M1210.5 1238.5c0-546.8 443.2-990 990-990s990 443.2 990 990-443.2 990-990 990-990-443.2-990-990Z"/></g></svg>
                </div>
                <div class="legend-key">
                    <p class="legend-label text-bold-weight">Sinkhole</p>
                    <p class="legend-description">${point_units[2].description}</p>
                </div>
            </div>
        </div>
        `;
    
    const point_cave = /* html */ `
        <div class="legend-row">
            <div class="legend-toggle">
                <div class="legend-swatch">
                    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2884 2012"><path fill="#aeaeae" stroke="#000" stroke-width="37" d="M147.5 1977.8 191 1640l204-212.2 204.9-255.7 159.5-321.8 96.3-233.7 103.1-123.8L1103.2 321 1220 190.4l82.6-89.4 130.6-82.5h110l158.1 13.7 75.7 103.2 89.3 185.6 156.1 206.9 15.8 40.6 111.2 173.2 146.3 126 62.6 199 129.3 192.2 59.4 182.6 173.1 171.2 5.7 138.2 27.5 110 41.2 130.6z"/><path fill="#3a3a3a" stroke="#000" stroke-linecap="round" stroke-width="37" d="m937.8 1228 492.6-549.5 270.3 9.4 413.4 566.5 48.4 280.3-83.6 448.5-1235.4 9.3-73-374.7Z"/><path fill="#747474" stroke="#747474" stroke-linecap="round" stroke-width="18" d="M1124.9 1020.2c-.7 64.1-1.3 139.8-1.9 203.8l36-61.8 5.2-128.8 10.3-61.8 5.1 77.3 20.6 25.7 5.2-133.9 46.3 56.6L1262 884"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-width="37" d="m934.8 1227 492.6-549.5 270.3 9.4 413.4 566.5 48.4 280.3-83.6 448.5-1235.4 9.3-73-374.7Z"/><path fill="#aeaeae" stroke="#000" stroke-linecap="round" stroke-width="37" d="M817.2 1992.5H28.5l73.2-165.2 28.1-103.2 81.3-144.5 14.4-6.9 233.9-48.2 65.1 27.5 178.8-27.5 81.3 34.4 105.7 13.8 40.7 110.1 16.2 68.8-24.3 55.1 40.6 96.3-48.8 89.5ZM1883.5 1984.9l976 6.6-26.4-102.2-39.5-112.1-36.3-138.5-9.9-26.4-46.2-56-23-16.5-112.2 23.1-79.1-56.1-75.8-3.3-75.9 9.9-42.8 33-118.7-42.9-99 26.4-115.4 145.1-42.8 154.9v82.5Z"/></svg>
                </div>
                <div class="legend-key">
                    <p class="legend-label text-bold-weight">Cave</p>
                    <p class="legend-description">${point_units[3].description}</p>
                </div>
            </div>
        </div>
        `;

    const point_aerial = /* html */ `
        <div class="legend-row">
            <div class="legend-toggle">
                <div class="legend-swatch">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="32" height="32" viewBox="0 0 2310 2013" overflow="hidden"><defs><clipPath id="a"><path fill-rule="evenodd" d="M237420 3241890h5622174v2699773H237420Z" clip-rule="evenodd"/></clipPath><clipPath id="c"><path fill-rule="evenodd" d="M237420 3241890h5622174v2699773H237420Z" clip-rule="evenodd"/></clipPath><image xlink:href="data:image/png;base64,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" id="b" width="932" height="936" preserveAspectRatio="none"/></defs><g clip-path="url(#a)" transform="translate(-1045 -231) matrix(0.000360892 0 0 0.000360892 1189 1269) matrix(1 0 0 1.00069 -237420 -3244127)"><use xlink:href="#b" width="100%" height="100%" transform="scale(6347.93 6347.93)"/></g><g clip-path="url(#c)" transform="translate(-1045 -231) matrix(-0.000360892 4.41966e-20 -4.41966e-20 -0.000360892 3218 1206) matrix(1 -3.43456e-24 -1.79572e-25 1.00069 -237420 -3244127)"><use xlink:href="#b" width="100%" height="100%" transform="scale(6347.93 6347.93)"/></g><path fill-rule="evenodd" d="m850.52 784 149.33 124.7 22.82-27.2c35.4-34.81 84.3-56.35 138.32-56.35 94.53 0 173.4 65.95 191.65 153.62l1.41 13.81 54.4 35.67h857.32l20.42 10.04 6.8 10.03 6.8 16.73 10.21 20.08-3.4 10.04-20.41 23.42-51.04 53.53-78.24 56.88-711.03-3.35-116.4-111.92-6.28 11.38c-35.15 51.17-94.69 84.82-162.21 84.82-94.53 0-173.4-65.95-191.64-153.62l-3.67-35.81-36.92-19.02L3.4 998.14 0 978.06v-20.07l6.8-43.5 17.01-23.42 40.83-43.5 102.06-60.22Z"/><path fill="#fff" fill-rule="evenodd" d="M1065 1022.5c0-53.3 43.88-96.5 98-96.5s98 43.2 98 96.5-43.88 96.5-98 96.5-98-43.2-98-96.5"/></svg>
                </div>
                <div class="legend-key">
                    <p class="legend-label text-bold-weight">Aerial</p>
                    <p class="legend-description">${point_units[4].description}</p>
                </div>
            </div>
        </div>
        `;
    
    // append custom icons to point tab 
    point_tab.insertAdjacentHTML("beforeend", point_sinkhole);
    point_tab.insertAdjacentHTML("beforeend", point_cave);
    point_tab.insertAdjacentHTML("beforeend", point_aerial);


    // add boundary labels 
    for (let i = 0; i < boundary_units.length; i++) {
            if (boundary_units[i].number != 1) { // solid lines  
                layer_row = /*html*/ `
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
                </div>
                `;
            } else { // dashed lines
                layer_row = /*html*/ `
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
                </div>
                `;
            }

            boundaries_tab.insertAdjacentHTML("beforeend", layer_row);
        } // end of boundaries for loop 

    legend_tabs_content.append(polygon_tab, point_tab, boundaries_tab);

    // add tabs and tab content to overall legend contents 
    legend.append(legend_tabs, legend_tabs_content);
    legend.append(PolygonsTab())
    // legend.insertAdjacentHTML("beforeend", Accordion());

    return legend;
}

function PolygonsTab() { // TODO add tab as parameter 
    const accordion_wrapper = document.createElement("div");
    accordion_wrapper.className = "container mt-5";

    const accordion_id = "polygons-accordion";
    const accordion = document.createElement("div");
    accordion.id = accordion_id;
    accordion.className = "accordion accordion-flush";
    
    for (let i = 0; i < polygon_units.length; i++) {
        const accordion_item = document.createElement("div");
        accordion_item.className = "accordion-item card shadow-sm mb-3 border-0 rounded-3 overflow-hidden";

        const accordion_header_id = `polygon-accordion-heading-${i}`; // TODO CHANGE THIS TO POLYGON NUM OR ABBREV

        const accordion_header = document.createElement("div");
        accordion_header.id = accordion_header_id;
        accordion_header.className = "accordion-header";

        const accordion_body_wrapper_id = `polygon-collapse-${i}`; // TODO CHANGE THIS TO POLYGON NUM OR ABBREV

        const accordion_body_wrapper = document.createElement("div");
        accordion_body_wrapper.id = accordion_body_wrapper_id;
        accordion_body_wrapper.className = "accordion-collapse collapse";
        accordion_body_wrapper.setAttribute("aria-labelledby", accordion_header_id);
        accordion_body_wrapper.setAttribute("data-bs-parent", `#${accordion_id}`);

        accordion_header.innerHTML = /*html*/ `
        <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${accordion_body_wrapper_id}" aria-expanded="false" aria-constrols="${accordion_body_wrapper_id}">
            <span class="">
                <!-- INSERT SVG HERE / SWATCH OF COLOR OR PATTERN --> 
            </span>
            HEADER NAME
        </button>
        `;

        const accordion_body = document.createElement("div");
        // accordion_body.id = "";
        accordion_body.className = "accordion-body";
        accordion_body.textContent = "This is the body of the accordion";

        // compile everything together 
        accordion_body_wrapper.append(accordion_body);
        accordion_item.append(accordion_header, accordion_body_wrapper);
        accordion.append(accordion_item)
    }

    // accordion_wrapper.append(accordion);
    // tab.append(accordion_wrapper);
    
    // return tab;
    return accordion_wrapper;
    // return accordion;
}

function PointsTab(tab) {
    
    return tab;
}

function BoundariesTab(tab) {
    
    return tab;
}