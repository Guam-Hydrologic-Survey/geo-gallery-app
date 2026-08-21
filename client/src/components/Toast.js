/* 
Toast.js
Description: 
*/

export function Toast() {
    console.log("Added Toast component");

    const toast_wrapper = document.createElement("div");
    toast_wrapper.id = "toast-wrapper";

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    const header = document.createElement("div");
    header.className = "toast-header";
    header.innerHTML = /*html*/ `
    <!-- <img src="" class="rounded me-2" alt=""> -->
    <strong class="me-auto">MAppFx</strong>
    <small class="text-body-secondary">Just now</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    `;

    const body = document.createElement("div");
    body.className = "toast-body";

    toast.append(header, body);
    console.log(toast);

    return toast;
}