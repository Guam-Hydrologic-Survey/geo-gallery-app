/* 
TransparencySlider.js
Description: 
*/

export function TransparencySlider() {

    const transparency_slider = document.createElement("div");

    transparency_slider.className = "offcanvas offcanvas-start";
    transparency_slider.tabIndex = -1;
    transparency_slider.id = "transparency-slider-offcanvas";

    transparency_slider.setAttribute("data-bs-scroll", "true");
    transparency_slider.setAttribute("data-bs-backdrop", "false");

    // range slider header 
    const header = document.createElement("div");
    header.className = "offcanvas-header";
    header.innerHTML = /*html*/ `
    <h2 class="offcanvas-title text-font-style-roboto-slab" id="offcanvasScrollingLabel">Layer Settings</h2>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    `;

    // range slider contents 
    const contents = document.createElement("div");
    contents.className = "offcanvas-body";
    contents.id = "range-slider-contents";

    const section_slider = document.createElement("div");
    section_slider.id = "transparency-slider-section";

    section_slider.innerHTML = /*html*/ `
    <p>Adjust the transparency of the <span class="text-bold-weight">polygons</span> on the map using the range slider below:</p>
    <div class="mb-3 d-flex align-items-end justify-content-between">
        <p id="range-value-text" class="text-italicize mb-0">Current transparency level = </p>
        <span id="range-value-label">100%</span>
    </div>

    <input type="range" class="form-range" min="0" max="100" step="1" id="transparency-range-slider" value="100">

    <div  class="slider-labels">
        <span id="poly-layer-0-pct-trans" data-pct="0">0%</span>
        <span id="poly-layer-25-pct-trans" data-pct="25">25%</span>
        <span id="poly-layer-50-pct-trans" data-pct="50">50%</span>
        <span id="poly-layer-75-pct-trans" data-pct="75">75%</span>
        <span id="poly-layer-100-pct-trans" data-pct="100">100%</span>
    </div>

    <hr class-"my-4">
    `;

    const restore_poly_trans_btn = document.createElement("button");
    restore_poly_trans_btn.className = "btn btn-success mt-3";
    restore_poly_trans_btn.id = "restore-transparency-btn";
    restore_poly_trans_btn.setAttribute("title", "Restore polygons to default transparency");
    restore_poly_trans_btn.innerHTML = /*html*/ `
    <i class="bi bi-arrow-clockwise"></i>
    Restore polygons to default transparency
    `;

    // offcanvas body 
    contents.append(section_slider, restore_poly_trans_btn);

    // offcanvas element 
    transparency_slider.append(header, contents);

    return transparency_slider; 
}