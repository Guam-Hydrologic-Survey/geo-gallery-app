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
    <h1 class="modal-title fs-4" id="tutorial-modal-title">About</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    // modal body 
    const body = document.createElement("div");
    body.className = "modal-body";
    body.innerHTML = /*html*/ `
    <p>
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

    const content = document.createElement("div");
    content.className = "modal-content";
    content.append(header, body, footer);

    const content_wrapper = document.createElement("div");
    content_wrapper.className = "modal-dialog modal-dialog-centered modal-xl";
    content_wrapper.append(content);

    modal.append(content_wrapper);

    return modal;
}