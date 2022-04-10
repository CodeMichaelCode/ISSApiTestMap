const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544'
const myIcon = L.icon({
    iconUrl: 'International_Space_Station.svg.png',
    iconSize: [60, 42],
    iconAnchor: [25, 16],
});

const myMap = L.map('issMap').setView([0, 0], 1);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution})
let marker = L.marker([0, 0], {icon: myIcon}).addTo(myMap);
tiles.addTo(myMap)

let firstLoad = true;

function getLonLat() {
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data.latitude);
        console.log(data.longitude);
        const {longitude, latitude} = data;
        document.getElementById('lon').innerText = longitude.toFixed(2);
        document.getElementById('lat').innerText = latitude.toFixed(2);
        if(firstLoad === true)
            myMap.setView([latitude, longitude], 4 );	
            firstLoad = false;
        marker.setLatLng([latitude, longitude]);
    })
    .catch(error => {
        console.error(error);
    })  
}

getLonLat();

setInterval(getLonLat, 2000)