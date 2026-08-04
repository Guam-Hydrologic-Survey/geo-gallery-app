/*
MapContainer.js
Description: Creates the <div> with #map as its ID
*/

export function MapContainer() {
    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    return mapDiv;
}