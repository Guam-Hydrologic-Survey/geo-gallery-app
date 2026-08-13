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

    // for polygon json properties 
    // TODO - clean up 
    const information = document.createElement("div");
    information.id = "text-info";

    const num_photos = document.createElement("p");
    num_photos.id = "num-photos";

    const gallery_container = document.createElement("div");
    gallery_container.id = "gallery";

    // add text description, num photos, and gallery container to modal body 
    // body.append(text_description, num_photos, gallery_container);
    body.append(text_description, information, num_photos, createAccordion(), gallery_container);

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

function createAccordion() {

    const accordion = document.createElement("div");
    accordion.className = "accordion";
    accordion.id = "accordion-example"

    const accordion_header = document.createElement("h2");
    accordion_header.className = "accordion-header";
    accordion_header.innerHTML = /*html*/ `
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">Accordion Item #1</button>
    `;

    const accordion_content = document.createElement("div");
    accordion_content.id = "collapse1";
    accordion_content.className = "accordion-collapse collapse show";
    accordion_content.setAttribute("data-bs-parent", "accordion-example");

    const accordion_body = document.createElement("div");
    accordion_body.className = "accordion-body";
    accordion_body.innerHTML = /*html*/ `
    <strong>This is the first item's accordion body.</strong> It is shown by default until the collapse plugin adds the appropriate classes that we use to style each element.
    `;

    accordion_content.append(accordion_body);

    const accordion_item = document.createElement("div");
    accordion_item.className = "accordion-item";
    accordion_item.append(accordion_header, accordion_content);

    accordion.append(accordion_item);

    return accordion;
}
