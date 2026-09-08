/*
Gallery.js
Description: Creates the Gallery component for site photos 
*/

export const gallery_ids = {
    modal: "results",
    text_description: "text-description",
    information: "text-info",
    num_photos: "num-photos",
    gallery: "gallery",
    photos_tab_btn_id: "photos-tab",
    photos_tab_pane_id: "photos-tab-pane",
    videos_tab_btn_id: "videos-tab",
    videos_tab_pane_id: "videos-tab-pane"
}

export function Gallery() {

    const modal = document.createElement("div");

    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.id = gallery_ids.modal;

    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("data-bs-backdrop", "true");

    const content_wrapper = document.createElement("div");
    content_wrapper.className = "modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable";

    const content = document.createElement("div");
    content.className = "modal-content";

    const header = document.createElement("div");
    header.className = "modal-header";
    header.innerHTML = /*html*/ `
    <h5 class="modal-title" id="point-clicked">Photo Gallery</h5>
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

    const num_photos = document.createElement("div");
    num_photos.className = "legend-badge badge rounded-pill";
    num_photos.id = "num-photos";

    const gallery_container = document.createElement("div");
    gallery_container.id = "gallery";

    const tabs = document.createElement("ul");
    tabs.className = "nav nav-tabs";
    tabs.id = "gallery-tabs";
    tabs.setAttribute("role", "tablist");

    // photos tab
    const photos_tab_li = document.createElement("li");
    photos_tab_li.className = "nav-item";
    photos_tab_li.setAttribute("role", "presentation");

    // const photos_tab_btn_id = "photos-tab";
    // const photos_tab_pane_id = "photos-tab-pane";

    const photos_tab_btn = document.createElement("button");
    photos_tab_btn.className = "nav-link active";
    photos_tab_btn.id = gallery_ids.photos_tab_btn_id;
    photos_tab_btn.setAttribute("data-bs-toggle", "tab");
    photos_tab_btn.setAttribute("data-bs-target", `#${gallery_ids.photos_tab_pane_id}`);
    photos_tab_btn.setAttribute("type", "button");
    photos_tab_btn.setAttribute("role", "tab");
    photos_tab_btn.setAttribute("aria-controls", `${gallery_ids.photos_tab_pane_id}`);
    photos_tab_btn.setAttribute("aria-selected", "true");
    photos_tab_btn.innerText = "Photos";

    // videos tab
    const videos_tab_li = document.createElement("li");
    videos_tab_li.className = "nav-item";
    videos_tab_li.setAttribute("role", "presentation");

    // const videos_tab_btn_id = "videos-tab";
    // const videos_tab_pane_id = "videos-tab-pane";

    const videos_tab_btn = document.createElement("button");
    videos_tab_btn.className = "nav-link";
    videos_tab_btn.id = gallery_ids.videos_tab_btn_id;
    videos_tab_btn.setAttribute("data-bs-toggle", "tab");
    videos_tab_btn.setAttribute("data-bs-target", `#${gallery_ids.videos_tab_pane_id}`);
    videos_tab_btn.setAttribute("type", "button");
    videos_tab_btn.setAttribute("role", "tab");
    videos_tab_btn.setAttribute("aria-controls", `${gallery_ids.videos_tab_pane_id}`);
    videos_tab_btn.setAttribute("aria-selected", "false");
    videos_tab_btn.innerText = "Videos";

    // add or remove disabled attribute depending on video availability
    // videos_tab_btn.setAttribute("disabled", "");

    // compile tabs
    photos_tab_li.append(photos_tab_btn);
    videos_tab_li.append(videos_tab_btn);
    tabs.append(photos_tab_li, videos_tab_li);

    // tab contents (container)
    const tab_contents = document.createElement("div");
    tab_contents.className = "tab-content";
    tab_contents.id = "gallery-tab-contents";

    // photos tab pane 
    const photos_tab_pane = document.createElement("div");
    photos_tab_pane.className = "tab-pane fade show active";
    photos_tab_pane.id = gallery_ids.photos_tab_pane_id;
    photos_tab_pane.setAttribute("role", "tabpanel");
    photos_tab_pane.setAttribute("aria-labelledby", gallery_container.photos_tab_btn_id);
    photos_tab_pane.setAttribute("tabindex", "0");

    // photos_tab_pane.innerText = "Photos tab pane contents";

    const videos_tab_pane = document.createElement("div");
    videos_tab_pane.className = "tab-pane fade";
    videos_tab_pane.id = gallery_ids.videos_tab_pane_id;
    videos_tab_pane.setAttribute("role", "tabpanel");
    videos_tab_pane.setAttribute("aria-labelledby", gallery_ids.videos_tab_btn_id);
    videos_tab_pane.setAttribute("tabindex", "0");

    videos_tab_pane.innerHTML = /*html*/ `
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Hlg2OLoAacc?si=sjaWNESeFqPR8wdr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;

    photos_tab_pane.append(num_photos, gallery_container)

    // compile tab contents 
    tab_contents.append(photos_tab_pane, videos_tab_pane);

    // add text description, num photos, and gallery container to modal body 
    // body.append(text_description, num_photos, gallery_container);
    // body.append(text_description, information, num_photos, createAccordion(), gallery_container);
    // body.append(text_description, information, num_photos, gallery_container, tabs, tab_contents);
    body.append(text_description, information, tabs, tab_contents);


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
