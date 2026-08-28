/* 
RangeSlider.js
Description: 
*/

export function RangeSlider() {
    console.log("Added Range Slider component");

    const range_slider = document.createElement("div");

    range_slider.className = "offcanvas offcanvas-start";
    range_slider.tabIndex = -1;
    range_slider.id = "range-slider-offcanvas";

    range_slider.setAttribute("data-bs-scroll", "true");
    range_slider.setAttribute("data-bs-backdrop", "false");

    // range slider header 
    const header = document.createElement("div");
    header.className = "offcanvas-header";
    header.innerHTML = /*html*/ `
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Adjust Polygon Transparency</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    `;

    // range slider contents 
    const contents = document.createElement("div");
    contents.className = "offcanvas-body";
    contents.id = "range-slider-contents";

    range_slider.append(header, LegendContents(contents));

    return range_slider; 
}