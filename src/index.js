import L from 'leaflet';

const getGeoJSON = async () => {
    const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const response = await fetch(url)
    const geoData = await response.json()

    initMap(geoData)
};

const initMap = (geoData) => {
    console.log("initmap")

    let map = L.map('map', {
        
        minZoom: -3
    })

    let geoJson = L.geoJSON(geoData, {
        weight: 2,
        onEachFeature: getFeature
         
    }).addTo(map)

    console.log("initmap2")
    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 13,
        attribution: "© OpenStreetMap",
        
    }).addTo(map);

  
   
    
    map.fitBounds(geoJson.getBounds())

    console.log("initmap3")
}


const getFeature = (feature , layer ) =>{
    console.log("initmap4")
    if(!feature.properties.id) return;
    const id = feature.properties.id
    
    console.log("testi")
    layer.bindPopup("testing" + id)
    
}

getGeoJSON();

