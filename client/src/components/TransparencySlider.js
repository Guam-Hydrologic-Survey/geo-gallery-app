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
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Adjust Layer Transparency</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    `;

    // range slider contents 
    const contents = document.createElement("div");
    contents.className = "offcanvas-body";
    contents.id = "range-slider-contents";

    const section_slider = document.createElement("div");
    section_slider.id = "transparency-slider-section";

    section_slider.innerHTML = /*html*/ `
    <p>Change the transparency of the polygons on the map using the range slider below:</p>
    <div class="mb-3 d-flex align-items-center justify-content-between">
        <p>Current transparency level = </p>
        <span id="range-value-label">100%</span>
    </div>

    <input type="range" class="form-range" min="0" max="100" step="1" id="transparency-range-slider" value="100">

    <div class="d-flex justify-content-between text-muted mt-1">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
    </div>
    `;

    // contents.innerHTML = /*html*/ `
    // <p>Adjust the transparency of the polygons on the map using the range slider below:</p>
    // <div class="mb-3 d-flex align-items-center justify-content-between">
    //     <span id="range-value-label">100%</span>
    // </div>

    // <input type="range" class="form-range" min="0" max="100" step="1" id="transparency-range-slider" value="100">

    // <div class="d-flex justify-content-between text-muted mt-1">
    //     <span>0%</span>
    //     <span>25%</span>
    //     <span>50%</span>
    //     <span>75%</span>
    //     <span>100%</span>
    // </div>
    // `;

    const contents2 = document.createElement("div");
    contents2.innerHTML = /*html*/ `
    <label for="range1" class="form-label">Example range</label>
    <input type="range" class="form-range" id="range1">
    `;

    const restore = document.createElement("button");
    restore.className = "btn btn-primary mt-3";
    restore.id = "restore-transparency-btn";
    restore.innerText = "Restore Default Transparency";

    // offcanvas body 
    contents.append(section_slider, restore);

    // offcanvas element 
    transparency_slider.append(header, contents);
    // transparency_slider.append(contents2);
    // transparency_slider.append(restore);

    return transparency_slider; 
}