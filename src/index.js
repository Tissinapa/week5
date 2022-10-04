import L from 'leaflet';

const getGeoJSON =async () =>{
    const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const response = await fetch(url)
    const geoData = await response.json()

    initMap(geoData)
};

const initMap = (geoData) => {
    
    let map = L.map('map', {
        minZoom: -3
    })
    let geoJson = L.geoJSON(geoData, {
        onEachFeature: getFeature
    }).addTo(map)

    map.fitBounds(geoJson.getBounds())
}


getGeoJSON();
