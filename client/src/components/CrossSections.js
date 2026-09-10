/* 
CrossSections.js
Descriptions:
*/

export const xsection_viewer_ids = {
    container: "cross-section-viewer-container",
    img: "cross-section-viewer-img"
}

export function CrossSections() {

    const xsection_viewer_container = document.createElement("div");
    xsection_viewer_container.id = xsection_viewer_ids.container;

    const xsection_viewer_img = document.createElement("img");
    xsection_viewer_img.id = xsection_viewer_ids.img;

    xsection_viewer_container.append(xsection_viewer_img);

    return xsection_viewer_container;
}