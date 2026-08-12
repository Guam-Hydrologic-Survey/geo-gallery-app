/* 
Tutorial.js
Description: Provides information on how to use map features 
*/

export function Tutorial() {
    console.log("Create Tutorial component");

    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.id = "tutorial";

    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("data-bs-backdrop", "true");

    // modal header 
    const header = document.createElement("div");
    header.className = "modal-header";
    header.innerHTML = /*html*/ `
    <h1 class="modal-title fs-4" id="tutorial-modal-title">Tutorial</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    // modal body 
    const body = document.createElement("div");
    body.className = "modal-body";
    body.innerHTML = /*html*/ `
    <p>Welcome to the Geology Photo Gallery. Brought to you by the Guam Hydrologic Survey Information Management Team at WERI.</p>
    <p>To use this map, click on a <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="Polygons" data-bs-content="Colored shapes covering areas on the map">polygon</span> or <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="Points" data-bs-content="Markers with different icons overlaying the map">point</span> to view available photos from that site.</p>
    `;

    // steps
    const steps = [
        {
            title: "1",
            body: "Lorem ipsom dolor sit amet"
        },
        {
            title: "2",
            body: "Lorem ipsom dolor sit amet"
        },
        {
            title: "3",
            body: "Lorem ipsom dolor sit amet"
        }
    ];

    // modal footer 
    const footer = document.createElement("div");
    footer.className = "modal-footer";
    footer.innerHTML = /*html*/ `
    <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Next</button>
    `;

    // wrapper for header, body, and footer 
    const content = document.createElement("div");
    content.className = "modal-content";
    content.append(header, body, footer);

    // overall wrapper for content - needed for bootstrap functionality 
    const content_wrapper = document.createElement("div");
    content_wrapper.className = "modal-dialog modal-dialog-centered modal-xl";
    content_wrapper.append(content);

    modal.append(content_wrapper);

    // create instance of bootstrap popovers
    modal.querySelectorAll(`[data-bs-toggle="popover"]`).forEach(el => {
        new bootstrap.Popover(el);
    })

    return modal;
}