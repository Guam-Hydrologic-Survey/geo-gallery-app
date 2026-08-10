/* 
modalFactory.js 
Utility module 
Description: Creates base of modal component 
*/

export function createModal({ id, title, bodyHTML }) {
    const modal = document.createElement("div");

    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.id = id;

    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("data-bs-backdrop", "true");

    modal.innerHTML = /*html*/ `
    
    `;
}