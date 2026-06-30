/* 
Gallery.js
Description: Creates the photo gallery modal, which contains the images for the select map feature.
Parameters: 'element' - the ID of the container for the gallery modal 
*/

export function Gallery(element) {
    element.innerHTML = /*html*/ `
    <div class="modal fade" id="results" tabindex="-1" data-bs-backdrop="true">
        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="point-clicked"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p id="text-description"></p>
                    <p id="num-photos"></p>
                    <div id="gallery"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" title="Back to map view">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

