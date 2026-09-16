/* 
NavBar.js
Description: Creates the About component 
*/

export function About() {
    const modal = document.createElement("div");

    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.id = "about";

    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("data-bs-backdrop", "true");

    // technical report
    const tr = {
      url: "",
      title: "",
      num: 0,
      author: "",
      year: 0,
    }

    // list associated technical reports
    const assoc_trs = [
      {
        url: "https://ghs-cdn.uog.edu/wp-content/databases/Library/PDFs/TRs/WERI%20TR%20180%20-%20Valerio%20et%20al%202023.pdf",
        title: "MAppFx: Production Well Nitrates Northern Guam Lens Aquifer",
        num: 180,
        author: "Valerio et al.",
        year: 2023,
      }
    ];

    const tr_btn_grp = document.createElement("div");
    tr_btn_grp.className = "btn-group";

    // btn for technical report 
    const tr_btn = document.createElement("a");
    tr_btn.className = "btn btn-primary";
    tr_btn.setAttribute("title", "Coming soon!"); // update to tr.title when available 
    tr_btn.setAttribute("href", tr.url);
    tr_btn.setAttribute("target", "_blank");
    tr_btn.setAttribute("rel", "noreferrer noopener");
    tr_btn.setAttribute("role", "button");
    tr_btn.textContent = "WERI Technical Report"; // update with num when available 
    
    // dropdown btn for assoc. technical reports 
    const toggle_dropdown = document.createElement("button");
    toggle_dropdown.className = "btn btn-primary dropdown-toggle dropdown-toggle-split";
    toggle_dropdown.setAttribute("role", "button");
    toggle_dropdown.setAttribute("data-bs-toggle", "dropdown");
    toggle_dropdown.setAttribute("aria-expanded", "false");
    toggle_dropdown.setAttribute("title", "View associated technical reports");

    toggle_dropdown.innerHTML = /*html*/ `
    <span class="visually-hidden">Toggle Dropdown</span>
    `;

    const dropdown_menu = document.createElement("ul");
    dropdown_menu.className = "dropdown-menu";

    // create first list item in dropdown menu
    dropdown_menu.innerHTML = /*html*/ `
    <li class="dropdown-item">Associated Technical Reports</li>
    <li><hr class="dropdown-divider"></li>
    `;

    // iterate through assoc_trs list to populate dropdown menu 
    assoc_trs.forEach(tr => {
      const li = document.createElement("li"); // wrapper for a tag
      const a = document.createElement("a"); 

      // a tag contents 
      a.className = "dropdown-item";
      a.setAttribute("href", tr.url);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noreferrer noopener");
      a.setAttribute("title", tr.title);
      a.textContent = `WERI TR ${tr.num} (${tr.author}, ${tr.year})`;

      li.append(a);
      dropdown_menu.append(li);
    });

    tr_btn_grp.append(tr_btn, toggle_dropdown, dropdown_menu);

    // modal header 
    const header = document.createElement("div");
    header.className = "modal-header";
    header.innerHTML = /*html*/ `
    <h1 class="modal-title fs-4" id="about-modal-title">About</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    // modal body 
    const body = document.createElement("div");
    body.className = "modal-body";
    body.innerHTML = /*html*/ `
    <p>The Geology Gallery (GeoGal, for short) is part of the <span class="text-italicize"><a target="_blank" rel="noreferrer noopener" href="https://guamhydrologicsurvey.uog.edu/mappfx-library/">WERI MAppFx series</a></span>. This MAppFx uses the features of the <span class="text-italicize"><a target="_blank" rel="noreferrer noopener" href="https://ghs-cdn.uog.edu/wp-content/databases/Library/Maps-Posters/Geologic-Topographic-Soils/WERI-UOG/SiegristEtAl07-GeologicMapSectionsGuamMarianaIslands.pdf">Geologic Map and Sections of Guam, Mariana Islands</a></span> (Siegrist, Reagan, Randall & Jenson, 2007) with the addition of sites from EV class fieldtrips and on-site research surveys. The GeoGal houses an extensive photo collection of these map features, ranging from aerial shots of hydrogeologic features (highlighting an overview of geologic features, watersheds, etc.) to close-up shots of geologic samples from field visits. Videos were also incorporated into the gallery with several drone shots covering areas and on-the-ground point-of-view shots. The availability of these resources at the user's fingertips removes the friction of field excursions when a quick reference or educational tool is needed.<br><br>
    WERI's MAppFx platform offers an interactive map environment on a web page, enabling users to retrieve graphs of specific sites by clicking on map features such as points, polygons, or lines. MAppFx is a data visualization tool that incorporates a user-friendly interface, empowering users and stakeholders to make informed decisions regarding water resource management. The growing presence of online web applications with mapping and graphing features offers an opportunity to revolutionize hydrologic data analysis, enabling users to visualize complex datasets and derive valuable insights for decision-making. 
    <br><br>The use of this database to develop these responsive features expands the interagency web map products and is now available on the <a target="_blank" rel="noreferrer noopener" href="https://guamhydrologicsurvey.uog.edu/">Guam Hydrologic Survey (GHS) website (guamhydrologicsurvey.uog.edu)</a>, Guam’s online repository of pertinent hydrologic information established by Guam’s public laws. With the established website and new online interactive interface technology available, the GHS Information Management Team are now inclined to pursue the expansion of hydrologic web products and field survey database. The ever-growing GHS website product is a true testament to interagency collaboration, a great means of hydrologic information, dissemination, and scientific information source for aquifer management. 
    <br><br>
    <span class=""><span class="text-bold-weight">Authors & Developers: </span>D.K. Valerio, S.M. Quintanilla, M.C. Snaer, & N.C. Habana, PhD.</span>
    <br>
    <span class=""><span class="text-bold-weight">Photo & Video Contributions: </span>WERI-GHS Hydrology Lab, Environmental Science graduate students</span>
    <br>
    <span class=""><span class="text-bold-weight">Acknowledgements: </span>UOG Web Team, WERI-GHS Hydrology Lab, BYU Civil Engineering Dept., & WERI-UOG.</span>
    </p>
    `;

    // modal footer 
    const footer = document.createElement("div");
    footer.className = "modal-footer about-btns";

    // ghs map libraries
    const map_libs = /*html*/ `
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        WERI Map Series
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" target="_blank" rel="noreferrer noopener" href="https://guamhydrologicsurvey.uog.edu/mappfx-library/" title="MAppFx Library on GHS">MAppFx Library</a></li>
        <li><a class="dropdown-item" target="_blank" rel="noreferrer noopener" href="https://guamhydrologicsurvey.uog.edu/web-mapps-library/" title="Web MApps Library on GHS">Web MApps</a></li>
        <li><a class="dropdown-item" target="_blank" rel="noreferrer noopener" href="https://guamhydrologicsurvey.uog.edu/maps-posters-library/" title="Maps & Posters Library on GHS">Maps & Posters Library</a></li>
      </ul>
    </div>
    `;
    
    // first, add dropdown menu for assoc. technical reports 
    footer.append(tr_btn_grp);

    // lastly, add map libraries 
    footer.insertAdjacentHTML("beforeend", map_libs);

    // modal content - wrapper for everything (incl. header, body, footer)
    const content = document.createElement("div");
    content.className = "modal-content";
    content.append(header, body, footer); // add modal elements to content

    const content_wrapper = document.createElement("div");
    content_wrapper.className = "modal-dialog modal-dialog-centered modal-xl";
    content_wrapper.append(content);

    modal.append(content_wrapper);

    return modal;
}