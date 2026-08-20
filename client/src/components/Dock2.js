/* 
Dock.js 
Description: 
*/

export function Dock() {
    console.log("Added Dock component");

    const dock_wrapper = document.createElement("div");
    dock_wrapper.className = "dock-wrapper";

    const dock = document.createElement("div");
    dock.class = "dock";
    dock.id = "dock-control";

    // buttons 
    const toggle_layer = document.createElement("button");
    toggle_layer.id = "toggle-layer-btn";
    toggle_layer.innerHTML = /*html*/ `
    <i data-lucide="layers"></i>
    <span class="dock-icon-tooltip">Toggle Layers</span>
    `;

    const zoom_in = document.createElement("button");
    zoom_in.id = "zoom-in-btn";
    zoom_in.innerHTML = /*html*/ `
    <i data-lucide="zoom-in"></i>
    <span class="dock-icon-tooltip">Zoom In</span>
    `;

    const zoom_out = document.createElement("button");
    zoom_out.id = "zoom-out-btn";
    zoom_in.innerHTML = /*html*/ `
    <i data-lucide="zoom-out"></i>
    <span class="dock-icon-tooltip">Zoom Out</span>
    `;

    const recenter = document.createElement("button");
    recenter.id = "recenter-btn";
    recenter.innerHTML = /*html*/ `
    <i data-lucide="rotate-ccw"></i>
    <span class="dock-icon-tooltip">Recenter Map</span>
    `;

    const locate = document.createElement("button");
    locate.id = "locate-btn";
    locate.innerHTML = /*html*/ `
    <i data-lucide="crosshair"></i>
    <span class="dock-icon-tooltip">Find My Location</span>
    `;

    dock.append(toggle_layer, zoom_in, zoom_out, recenter, locate);

    console.log(dock);

    return dock;
}

// <!-- dock -->
// <div class="dock-wrapper">
// <div class="dock" id="dock-control">
//     <button id="toggle-legend" data-bs-toggle="offcanvas" data-bs-target="legend-offcanvas" aria-controls="offcanvasScrolling">
//         <i data-lucide="list"></i>
//         <span class="dock-icon-tooltip">Legend</span>
//     </button>
//     <button id="toggle-layer">
//         <i data-lucide="layers"></i>
//         <span class="dock-icon-tooltip">Toggle Layer</span>
//     </button>
//     <button id="zoom-in">
//         <i data-lucide="zoom-in"></i>
//         <span class="dock-icon-tooltip">Zoom In</span>
//     </button>
//     <button id="zoom-out">
//         <i data-lucide="zoom-out"></i>
//         <span class="dock-icon-tooltip">Zoom Out</span>
//     </button>
//     <button id="recenter">
//         <i data-lucide="rotate-ccw"></i>
//         <span class="dock-icon-tooltip">Recenter Map</span>
//     </button>
//     <button id="locate">
//         <i data-lucide="crosshair"></i>
//         <span class="dock-icon-tooltip">Find My Location</span>
//     </button>
//     <div class="btn-group dropup">
//         <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//             <i data-lucide="layers"></i>
//             <span class="dock-icon-tooltip">Toggle Layer</span>
//         </button>
//         <ul class="dropdown-menu">
//             <li><h6 class="dropdown-header">Base Layers</h6></li>
//             <li class="form-check">
//                 <input class="form-check-input" type="radio" name="radioOptions" id="radio1">
//                 <label class="form-check-label" for="radio1">Open Street Map</label>
//             </li>
//             <li class="form-check">
//                 <input class="form-check-input" type="radio" name="radioOptions" id="radio1">
//                 <label class="form-check-label" for="radio1">ESRI World Imagery</label>
//             </li>
//             <!-- <li><a class="dropdown-item" href="#">Menu item</a></li> -->
//             <li><hr class="dropdown-divider" style="border-color: #677077;"></li>
//             <li><h6 class="dropdown-header">Villages</h6></li>
//             <li class="form-check">
//                 <input class="form-check-input" type="checkbox" id="checkbox1">
//                 <label class="form-check-label" for="checkbox1">North</label>
//             </li>
//             <li class="form-check">
//                 <input class="form-check-input" type="checkbox" id="checkbox1">
//                 <label class="form-check-label" for="checkbox1">South</label>
//             </li>
//         </ul>
//     </div>
// </div>
// </div>
// `;