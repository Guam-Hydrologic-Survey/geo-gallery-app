/* 
NavBar.js
Description: Creates the Navigation Bar component. 
*/

export function NavBar() {
    console.log("Added NavBar");

    const title = "MAppFx: Geology Photo Gallery";

    const navbar = document.createElement("nav");
    navbar.id = "navbar";
    navbar.className = "navbar navbar-dark bg-dark px-3";

    // create header container projec title and logo   
    const brand = document.createElement("a");
    brand.className = "navbar-brand mb-0";
    brand.href = "#";

    const logo = document.createElement("img");
    logo.src = "/assets/WERI-Logo.png";
    logo.alt = "WERI Logo";
    logo.width = 30;
    logo.height = 24;
    logo.className = "d-inline-block align-text-top";

    brand.appendChild(logo);
    brand.appendChild(document.createTextNode(title));

    const controls =  document.createElement("div");
    controls.className = "d-flex align-items-center gap-2";

    const aboutBtn = document.createElement("button");
    aboutBtn.type = "button";
    aboutBtn.className = "btn btn-outline-light btn-sm";
    aboutBtn.setAttribute("data-bs-toggle", "modal");
    aboutBtn.setAttribute("data-bs-target", "#about");
    aboutBtn.setAttribute("aria-controls", "about");
    aboutBtn.setAttribute("title", "About");
    aboutBtn.textContent = "About";
    // aboutBtn.innerHTML = /*html*/ `
    // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
    //     <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    // </svg>
    // `;

    const tutorialBtn = document.createElement("button");
    tutorialBtn.type = "button";
    tutorialBtn.className = "btn btn-outline-light btn-sm";
    tutorialBtn.setAttribute("data-bs-toggle", "modal");
    tutorialBtn.setAttribute("data-bs-target", "#tutorial");
    tutorialBtn.setAttribute("aria-controls", "tutorial");
    tutorialBtn.setAttribute("title", "Tutorial");
    tutorialBtn.textContent = "Tutorial";
    // tutorialBtn.innerHTML = /*html*/ `
    // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16">
    //     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
    // </svg>
    // `;

    const lengendBtn = document.createElement("button");
    lengendBtn.type = "button";
    lengendBtn.className = "btn btn-outline-light btn-sm";
    lengendBtn.textContent = "Legend";
    lengendBtn.setAttribute("data-bs-toggle", "offcanvas");
    lengendBtn.setAttribute("data-bs-target", "#legend-offcanvas");
    lengendBtn.setAttribute("aria-controls", "legend");
    lengendBtn.setAttribute("title", "Legend");

    // for testing purpose only - remove later 
    const galleryBtn = document.createElement("button");
    galleryBtn.type = "button";
    galleryBtn.className = "btn btn-outline-light btn-sm";
    galleryBtn.textContent = "Gallery";
    galleryBtn.setAttribute("data-bs-toggle", "modal");
    galleryBtn.setAttribute("data-bs-target", "#results");
    galleryBtn.setAttribute("aria-controls", "gallery");
    galleryBtn.setAttribute("title", "Gallery");

    const dropdown = createDropdownLinks();

    controls.append(aboutBtn, tutorialBtn, lengendBtn, galleryBtn, dropdown);
    navbar.append(brand, controls);
    return navbar;
}

function createDropdownLinks() {
    const container = document.createElement("div");
    container.className = "dropdown";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "btn btn-outline-light btn-sm dropdown-toggle";
    toggle.setAttribute("data-bs-toggle", "dropdown");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("title", "Links");
    toggle.textContent = "Links";

    const menu = document.createElement("ul");
    menu.className = "dropdown-menu dropdown-menu-end";

    const links = [
        { 
            label: "Water & Environmental Research Institute of the Western Pacific",
            href: "https://weri.uog.edu/"
        },
        {
            label: "Guam Hydrologic Survey",
            href: "https://guamhydrologicsurvey.uog.edu"
        }
    ];

    links.forEach(({ label, href }) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.className = "dropdown-item";
        a.href = href;
        a.textContent = label;

        li.appendChild(a);
        menu.appendChild(li);
    });

    container.append(toggle, menu);
    return container;
}
