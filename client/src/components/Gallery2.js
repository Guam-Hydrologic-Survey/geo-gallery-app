/*
Gallery.js
Description: Creates the Gallery component for site photos 
*/

export function Gallery() {
    console.log("Added Gallery component");

    const modal = document.createElement("div");

    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.id = "results";

    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("data-bs-backdrop", "true");

    const content_wrapper = document.createElement("div");
    content_wrapper.className = "modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable";

    const content = document.createElement("div");
    content.className = "modal-content";

    const header = document.createElement("div");
    header.className = "modal-header";
    header.innerHTML = /*html*/ `
    <h5 class="modal-title" id="point-clicked"></h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    // modal body contents 
    const body = document.createElement("div");
    body.className = "modal-body";

    const text_description = document.createElement("p");
    text_description.id = "text-description";

    const num_photos = document.createElement("p");
    num_photos.id = "num-photos";

    const gallery_container = document.createElement("div");
    gallery_container.id = "gallery";

    // add text description, num photos, and gallery container to modal body 
    body.append(text_description, num_photos, gallery_container);

    const footer = document.createElement("div");
    footer.className = "modal-footer";
    footer.innerHTML = /*html*/ `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" title="Back to map view">Close</button>
    `;

    content.append(header, body, footer);
    content_wrapper.append(content);
    modal.append(content_wrapper);

    return modal;
}