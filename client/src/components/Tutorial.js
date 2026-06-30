/* 
Tutorial.js
Description: Creates the informational modal on how to use the web app 
Parameters: 'element' - the ID of the container for the tutorial modal 
*/

export function Tutorial(element) {
    element.innerHTML = /*html*/ `
    <!-- tutorial modal  -->
    <div class="modal fade" id="tutorial" tabindex="-1" data-bs-backdrop="true">
        <div class="modal-dialog modal-dialog-centered  modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="">Welcome to the Geology Photo Gallery!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <p class="text-bold-weight">How to use:</p>
                <p>To view available field photos for a site, please click on a map feature (e.g., polygon or point).</p>
                <p class="text-italicize">Brought to you by the GHS Information Management Team at WERI-UOG.</p>
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