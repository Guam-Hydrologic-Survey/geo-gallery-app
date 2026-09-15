/* 
Tutorial.js
Description: Provides information on how to use map features 
*/

export function Tutorial() {

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
    <h1 class="modal-title fs-4" id="tutorial-modal-title">Tutorial</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    const popover_contents_layer_toggle = /*html*/ `
    A side panel containing options to change the base map tiles and toggle feature layers on and off. Trigger by clicking on this icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg> 
    `;

    const popover_contents_layer_transparency = /*html*/ `
    A side panel containing a slider to change the opacity of the polygon layers. It ranges from 0% to 100% and provides the option to reset to the default polygon layer transparency. Trigger by clicking on this icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scan-square-icon lucide-scan-square"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="8" height="8" x="8" y="8" rx="1"/></svg>
    `;

    let current = 0;

    // modal body 
    const body = document.createElement("div");
    body.className = "modal-body";
    body.innerHTML = /*html*/ `
    <p>Welcome to the Geology Photo Gallery!</p>
    <p class="text-italicize">Here's a quick guide on the app's features.</p>
    <div class="tab-container">
        <div class="d-flex align-items-start">
            <ul class="nav nav-pills flex-column me-3" style="min-width: 150px;" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="tutorial-1" data-bs-toggle="tab" data-bs-target="#tutorial-contents-1" type="button" role="tab">Get started</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="tutorial-2" data-bs-toggle="tab" data-bs-target="#tutorial-contents-2" type="button" role="tab">Toggle layers</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="tutorial-3" data-bs-toggle="tab" data-bs-target="#tutorial-contents-3" type="button" role="tab">Adjust layer transparency</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="tutorial-4" data-bs-toggle="tab" data-bs-target="#tutorial-contents-4" type="button" role="tab">View cross sections</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="tutorial-5" data-bs-toggle="tab" data-bs-target="#tutorial-contents-5" type="button" role="tab">Zoom controls</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="tutorial-6" data-bs-toggle="tab" data-bs-target="#tutorial-contents-6" type="button" role="tab">Pin location</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="tutorial-7" data-bs-toggle="tab" data-bs-target="#tutorial-contents-7" type="button" role="tab">Legend contents</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="tutorial-8" data-bs-toggle="tab" data-bs-target="#tutorial-contents-8" type="button" role="tab">Navigation contents</button>
                </li>
            </ul>

            <div class="tab-content flex-fill" id="tab-contents">
                <div class="tab-pane fade show active" id="tutorial-contents-1" role="tabpanel">
                    To use this map, click on a <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="Polygons" data-bs-content="Colored shapes covering areas on the map">polygon</span> or <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="Points" data-bs-content="Markers with different icons overlaying the map">point</span> to view available photos from that site.
                    <br><br>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/n9hkel0uOsg?si=Xzszw7KcZKAea3lR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div class="tab-pane fade" id="tutorial-contents-2" role="tabpanel">
                    To adjust the visibility of the map features, check out the <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-html="true" data-bs-title="Layer Toggle" data-bs-content='${popover_contents_layer_toggle}'>layer toggle</span> on the dock at the bottom.
                    <br><br>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/xQV-Jr30wco?si=IXZv0QHdxUHfWg5O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div class="tab-pane fade" id="tutorial-contents-3" role="tabpanel">
                    To adjust the transparency of the polygon layers, check out the <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-html="true" data-bs-title="Adjust Layer Transparency" data-bs-content='${popover_contents_layer_transparency}'>layer transparency slider</span> on the dock at the bottom.
                    <br><br>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AnqjZEAzxOE?si=pY8m6zQggdyVugXX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>    
                </div>
                <div class="tab-pane fade" id="tutorial-contents-4" role="tabpanel">
                    To view cross sections of the aquifer, check out the <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-html="true" data-bs-title="View Cross Sections of the Aquifer" data-bs-content="Adds the cross sections of the aquifer as lines. To view a specific cross section, click on one of the blue lines on the map">cross sections viewer</span> on the dock at the bottom.
                    <br><br>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/YJ4Uhz1elvg?si=oHZIqmceMSLW3zuG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div class="tab-pane fade" id="tutorial-contents-5" role="tabpanel">
                    Control the zoom levels of the map using the magnifying glass buttons on the dock at the bottom. To recenter the map back to its default position, click on the recenter button on the dock at the bottom. 
                    <br><br>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/q05xVzLajx4?si=nOKKqt99c0C94I8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div class="tab-pane fade" id="tutorial-contents-6" role="tabpanel">
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lRCkfvEpeJU?si=5R-yjOgt5xvuFrTV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div class="tab-pane fade" id="tutorial-contents-7" role="tabpanel">
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/5-a7CwEc6fA?si=p-lESyjqXSUp2qs9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div class="tab-pane fade" id="tutorial-contents-8" role="tabpanel">
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/csTBv0Gfif0?si=t_AJt_bDPx65b3Vk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div> <!-- end of tab contents -->

        </div> <!-- end of flex-content -->
    </div> <!-- end of .tab-container -->
    `;

    // steps
    const steps = [
        {
            title: "Welcome to the Geo Gallery!",
            body: "This is a quick tour of the app's features. It only takes a few seconds."
        },
        {
            title: "The navigation bar",
            body: "It sits at the top right of the page. It houses information about the project, and links to maps and related resources on the Guam Hydrologic Survey website. Here, you can also find the Legend, which provides the key to the geologic features on the map."
        },
        {
            title: "The dock",
            body: "It sits at the bottom center of the page. It contains all the map controls, such as the layer visibility toggle, the layer transparency adjustment, cross sections of the aquifer, zoom, recenter, and a geo locator."
        },
        {
            title: "",
            body: "Lorem ipsom dolor sit amet"
        }
    ];

    // modal footer 
    const footer = document.createElement("div");
    footer.className = "modal-footer";
    footer.innerHTML = /*html*/ `
    <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
    `;

    // wrapper for header, body, and footer 
    const content = document.createElement("div");
    content.className = "modal-content";
    content.append(header, body, footer);

    // overall wrapper for content - needed for bootstrap functionality 
    const content_wrapper = document.createElement("div");
    content_wrapper.className = "modal-dialog modal-dialog-centered modal-xl";
    content_wrapper.append(content);

    modal.append(content_wrapper);

    // extend boostrap so svg markup isn't stripped 
    const allowList = bootstrap.Tooltip.Default.allowList;
    allowList.svg = ['xmlns', 'width', 'height', 'viewbox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'class'];
    allowList.path = ['d', 'fill'];
    allowList.rect = ['width', 'height', 'x', 'y', 'rx', 'ry'];
    allowList.circle = ['cx', 'cy', 'r'];
    allowList.line = ['x1', 'x2', 'y1', 'y2'];
    allowList.polyline = ['points'];
    allowList.polygon = ['points'];
    allowList.use = ['href', 'xlink:href'];

    // create instance of bootstrap popovers
    modal.querySelectorAll(`[data-bs-toggle="popover"]`).forEach(el => {
        new bootstrap.Popover(el, { allowList: allowList});
    });

    return modal;
}