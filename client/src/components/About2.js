/* 
NavBar.js
Description: Creates the About component 
*/

export function About() {
    console.log("Added About component");

    const modal = document.createElement("div");

    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.id = "about";

    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("data-bs-backdrop", "true");

    modal.innerHTML = /*html*/ `
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-4" id="about-modal-title">About</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            <br><br> WERI's MAppFx platform offers an interactive map environment on a web page, enabling users to retrieve graphs of specific sites by clicking on map features such as points, polygons, or lines. MAppFx is a data visualization tool that incorporates a user-friendly interface, empowering users and stakeholders to make informed decisions regarding water resource management. The growing presence of online web applications with mapping and graphing features offers an opportunity to revolutionize hydrologic data analysis, enabling users to visualize complex datasets and derive valuable insights for decision-making. 
            <br><br>The use of this dataset to develop these responsive features expands the interagency web map products and is now available on the Guam Hydrologic Survey (GHS) website (guamhydrologicsurvey.uog.edu), Guam’s online repository of pertinent hydrologic information established by Guam’s public laws. With the established website and new online interactive interface technology available, the GHS Information Management Team are now inclined to pursue the expansion of hydrologic web products and field survey database. The ever-growing GHS website product is a true testament to interagency collaboration, a great means of hydrologic information, dissemination, and scientific information source for aquifer management. 
            </p>
          </div>
          <div class="modal-footer about-btns">
            <!-- Dropdown for links to associated TRs -->
            <div class="btn-group">
              <a class="btn btn-primary" title="Coming soon!" href="https://guamhydrologicsurvey.uog.edu/" target="_blank" rel="noreferrer noopener" role="button">WERI Technical Report</a>
              <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" title="View associated technical reports">
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li class="dropdown-item">Associated Technical Reports</li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="https://ghs-cdn.uog.edu/wp-content/databases/Library/PDFs/TRs/WERI%20TR%20180%20-%20Valerio%20et%20al%202023.pdf">WERI TR 180 (Valerio et al., 2023)</a></li>
                <li><a class="dropdown-item" href="#" target="_blank" rel="noreferrer noopener" title="Salinity in the Northern Guam Lens Aquifer">WERI TR</a></li>
                <li><a class="dropdown-item" href="#" target="_blank" rel="noreferrer noopener" title="">WERI TR</a></li>
                <li><a class="dropdown-item" href="#" target="_blank" rel="noreferrer noopener" title="">WERI TR</a></li>
              </ul>
            </div>

            <!-- Dropdown for links to GHS maps libraries -->
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                WERI Map Series
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" target="_blank" rel="noreferrer noopener" href="https://guamhydrologicsurvey.uog.edu/mappfx-library/" title="MAppFx Library on GHS">MAppFx Library</a></li>
                <li><a class="dropdown-item" target="_blank" rel="noreferrer noopener" href="https://guamhydrologicsurvey.uog.edu/web-mapps-library/" title="Web MApps Library on GHS">Web MApps</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
    `;

    return modal;
}