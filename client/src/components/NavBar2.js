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
    aboutBtn.textContent = "About";
    aboutBtn.setAttribute("data-bs-toggle", "modal");
    aboutBtn.setAttribute("data-bs-target", "#about");
    // aboutBtn.setAttribute("aria-controls", "about");

    const lengendBtn = document.createElement("button");
    lengendBtn.type = "button";
    lengendBtn.className = "btn btn-outline-light btn-sm";
    lengendBtn.textContent = "Legend";
    lengendBtn.setAttribute("data-bs-toggle", "offcanvas");
    lengendBtn.setAttribute("data-bs-target", "#legend");
    lengendBtn.setAttribute("aria-controls", "legend");

    const dropdown = createDropdownLinks();

    controls.append(aboutBtn, lengendBtn, dropdown);
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
