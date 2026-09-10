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

    // modal body 
    const body = document.createElement("div");
    body.className = "modal-body";
    body.innerHTML = /*html*/ `
    <p>Welcome to the Geology Photo Gallery!</p>
    <p class="text-italicize">Here's a quick guide on the app's features:</p>
    <ul>
        <li>To use this map, click on a <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="Polygons" data-bs-content="Colored shapes covering areas on the map">polygon</span> or <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="Points" data-bs-content="Markers with different icons overlaying the map">point</span> to view available photos from that site.</li>
        <li>To adjust the visibility of the map features, check out the <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="Layer Toggle" data-bs-content="A side panel containing options to change the base map tiles and toggle feature layers on and off">layer toggle</span> on the dock at the bottom.</li>
        <li>To adjust the transparency of the polygon layers, check out the <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="Adjust Layer Transparency" data-bs-content="A side panel containing a slider to change the opacity of the polygon layers. It ranges from 0% to 100% and provides the option to reset to the default polygon layer transparency.">layer transparency slider</span> on the dock at the bottom.</li>
        <li>To view cross sections of the aquifer, check out the <span class="term" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-title="View Cross Sections of the Aquifer" data-bs-content="Adds the cross sections of the aquifer as lines. To view a specific cross section, click on one of the blue lines on the map">cross sections viewer</span> on the dock at the bottom.</li>
        <li>Control the zoom levels of the map using the magnifying glass buttons on the dock at the bottom</li>
        <li>To recenter the map back to its default position, click on the recenter button on the dock at the bottom</li>
    </ul>
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
    <button type="button" class="btn btn-primary">Next</button>
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

    // create instance of bootstrap popovers
    modal.querySelectorAll(`[data-bs-toggle="popover"]`).forEach(el => {
        new bootstrap.Popover(el);
    })

    return modal;
}