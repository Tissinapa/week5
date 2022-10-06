 import L from 'leaflet';

const getGeoJSON = async () => {
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
        weight: 2,
        onEachFeature: getFeature
         
    }).addTo(map)

  
    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 13,
        attribution: "© OpenStreetMap",
        
    }).addTo(map);

  
    
    map.fitBounds(geoJson.getBounds())

    
}


const getFeature = (feature , layer ) =>{
    
    if(!feature.properties.nimi) return;
    
    let municipalities = feature.properties.nimi
    
    layer.bindTooltip(municipalities).openTooltip();
    
/*     layer.bindPopup(
         `<ul>
        <li>Name: ${municipalities}</li>
    </ul>` 
    //`<h1>name: ${municipalities}</h1>`
    )
    layer.bindTooltip(municipalities) */

}

getGeoJSON();


