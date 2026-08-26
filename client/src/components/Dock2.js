/* 
Dock.js 
Description: 
*/

export function Dock() {
    console.log("Added Dock component");

    const dock_wrapper = document.createElement("div");
    dock_wrapper.className = "dock-wrapper";

    const dock = document.createElement("div");
    dock.className = "dock";
    dock.id = "dock-control";

    // buttons 
    const toggle_layer = document.createElement("button");
    toggle_layer.id = "toggle-layer-btn";
    toggle_layer.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers-icon lucide-layers"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
    <span class="dock-icon-tooltip">Toggle Layers</span>
    `;
    toggle_layer.setAttribute("data-bs-toggle", "offcanvas");
    toggle_layer.setAttribute("data-bs-target", "#layer-toggle-offcanvas");

    const zoom_in = document.createElement("button");
    zoom_in.id = "zoom-in-btn";
    zoom_in.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in-icon lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
    <span class="dock-icon-tooltip">Zoom In</span>
    `;

    const zoom_out = document.createElement("button");
    zoom_out.id = "zoom-out-btn";
    zoom_out.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-out-icon lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
    <span class="dock-icon-tooltip">Zoom Out</span>
    `;

    const recenter = document.createElement("button");
    recenter.id = "recenter-btn";
    recenter.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scan-square-icon lucide-scan-square"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="8" height="8" x="8" y="8" rx="1"/></svg>
    <span class="dock-icon-tooltip">Recenter Map</span>
    `;

    const locate = document.createElement("button");
    locate.id = "locate-btn";
    locate.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate-icon lucide-locate"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/></svg>
    <span class="dock-icon-tooltip">Find My Location</span>
    `;

    const transparency_slider = document.createElement("button");
    transparency_slider.id = "transparency-btn";
    transparency_slider.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings2-icon lucide-settings-2"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
    <span class="dock-icon-tooltip">Adjust Polygon Transparency</span>
    `;

    dock.append(toggle_layer, zoom_in, zoom_out, recenter, locate, transparency_slider);
    dock_wrapper.append(dock);

    console.log(dock_wrapper);

    return dock_wrapper;
}
