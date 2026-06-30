/*
Legend.js
Description: Creates the legend offcanvas, which contains color and pattern swatches for map features (e.g., polygons and icon markers)
Parameters: 'element' - the ID of the container for the legend 
*/

export function Legend(element) {
    
    element.innerHTML = /* html */`
    <!-- legend offcanvas -->
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="legend-offcanvas" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Legend</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" id="legend-contents">
        </div>
    </div>
    `;
}