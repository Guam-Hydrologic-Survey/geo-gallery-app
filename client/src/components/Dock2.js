/* 
Dock.js 
Description: 
*/

const dock_ids = {
    dock: "dock-control",
    toggle_layer: "toggle-layer-btn",
    zoom_in: "zoom-in-btn",
    zoom_out: "zoom-out-btn",
    recenter: "recenter-btn",
    locate: "locate-btn",
    transparency_slider: "transparency-btn",
    cross_section: "cross-section-btn"

}

export function Dock() {

    const dock_wrapper = document.createElement("div");
    dock_wrapper.className = "dock-wrapper";

    const dock = document.createElement("div");
    dock.className = "dock";
    dock.id = dock_ids.dock;

    // buttons 
    const toggle_layer = document.createElement("button");
    toggle_layer.id = dock_ids.toggle_layer;
    toggle_layer.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers-icon lucide-layers"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
    <span class="dock-icon-tooltip">Toggle Layers</span>
    `;
    toggle_layer.setAttribute("data-bs-toggle", "offcanvas");
    toggle_layer.setAttribute("data-bs-target", "#layer-toggle-offcanvas");

    const zoom_in = document.createElement("button");
    zoom_in.id = dock_ids.zoom_in;
    zoom_in.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in-icon lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
    <span class="dock-icon-tooltip">Zoom In</span>
    `;

    const zoom_out = document.createElement("button");
    zoom_out.id = dock_ids.zoom_out;
    zoom_out.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-out-icon lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
    <span class="dock-icon-tooltip">Zoom Out</span>
    `;

    const recenter = document.createElement("button");
    recenter.id = dock_ids.recenter;
    recenter.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scan-square-icon lucide-scan-square"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="8" height="8" x="8" y="8" rx="1"/></svg>
    <span class="dock-icon-tooltip">Recenter Map</span>
    `;

    const locate = document.createElement("button");
    locate.id = dock_ids.locate;
    locate.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate-icon lucide-locate"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/></svg>
    <span class="dock-icon-tooltip">Find My Location</span>
    `;

    const tooltip = "Adjust Layer Transparency";
    const transparency_slider = document.createElement("button");
    transparency_slider.id = dock_ids.transparency_slider;
    transparency_slider.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings2-icon lucide-settings-2"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
    <span class="dock-icon-tooltip">${tooltip}</span>
    `;
    transparency_slider.setAttribute("data-bs-toggle", "offcanvas");
    transparency_slider.setAttribute("data-bs-target", "#transparency-slider-offcanvas");

    const cross_section = document.createElement("button");
    cross_section.type = "button";
    cross_section.id = dock_ids.cross_section;
    cross_section.textContent = "Cross Sections of the Aquifer";
    cross_section.innerHTML = /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-intersect" viewBox="0 0 16 16">
        <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2zm6-8V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2V6a2 2 0 0 1 2-2z"/>
    </svg>
    <span class="dock-icon-tooltip" id="cross-section-tooltip">View Cross Sections of the Aquifer</span>
    `;

    dock.append(toggle_layer, transparency_slider, cross_section, zoom_in, zoom_out, recenter, locate);
    dock_wrapper.append(dock);

    return dock_wrapper;
}
