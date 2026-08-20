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
