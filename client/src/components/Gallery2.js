/*
Gallery.js
Description: Creates the Gallery component for site photos 
*/

export function Gallery() {
    console.log("Added Gallery component");

    const modal_outer = document.createElement("div");

    modal_outer.className = "modal fade";
    modal_outer.tabIndex = -1;
    modal_outer.id = "results";

    modal_outer.setAttribute("aria-hidden", "true");
    modal_outer.setAttribute("data-bs-backdrop", "true");

    const modal_inner = document.createElement("div");
    modal_inner.className = "modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable";

    const modal_content = document.createElement("div");
    modal_content.className = "modal-content";

    const modal_header = document.createElement("div");
    modal_header.className = "modal-header";
    modal_header.innerHTML = /*html*/ `
    <h5 class="modal-title" id="point-clicked"></h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    // modal body contents 
    const modal_body = document.createElement("div");

    const text_description = document.createElement("p");
    text_description.id = "text-description";

    const num_photos = document.createElement("p");
    num_photos.id = "num-photos";

    const gallery_container = document.createElement("div");
    gallery_container.id = "gallery";

    const modal_footer = document.createElement("div");
    modal_footer.innerHTML = /*html*/ `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" title="Back to map view">Close</button>
    `;

    modal_content.append(modal_header, modal_body, modal_footer);
    modal_inner.append(modal_content);
    modal_outer.append(modal_inner);

    return modal_outer;
}