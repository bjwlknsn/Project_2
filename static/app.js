
	var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

var outdoorsMap =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

var satelliteMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/satellite-v9',
tileSize: 512,
zoomOffset: -1,
accessToken: API_KEY
});
// initialize the map on the "map" div with a given center and zoom

var myMap= L.map('mapid', {
  center : [38.53923062275447, -105.99221539654775],
  zoom : 8
  // layers : [lightMap, c_markers]
});
// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

d3.json("/getmountains").then(function(data) {
  var mt_lats = []
  var mt_longs = []
  var mts = []
  for(i=0; i<data.length; i++) {
    mt_longs.push(data[i]["Peak Longitude"]);
    mt_lats.push(data[i]["Peak Latitude"]);
    var mtIcon = L.icon({
      iconUrl: '../static/img/mt.png',
      iconSize: [20, 20]
    });
  var marker = L.marker([mt_lats[i], mt_longs[i]], {
  icon : mtIcon
}).addTo(myMap).bindPopup(`<br><b>Mountain Peak: ${data[i]["Mountain Peak"]}</b>	<br>Mountain Range: ${data[i]["Mountain Range"]}	<br>Elevation_ft: ${data[i]["Elevation_ft"]}	<br>fourteener: ${data[i]["fourteener"]}	<br>Prominence_ft: ${data[i]["Prominence_ft"]}	<br>Isolation_mi: ${data[i]["Isolation_mi"]}	<br>Peak Longitude: ${data[i]["Peak Longitude"]}	<br>Peak Latitude: ${data[i]["Peak Latitude"]}	<br>Standard Route: ${data[i]["Standard Route"]}	<br>Standard Route Distance (miles): ${data[i]["Standard Route Distance (miles)"]}	<br>Elevation Gain_ft: ${data[i]["Elevation Gain_ft"]}	<br>Difficulty: ${data[i]["Difficulty"]}	<br>Traffic Low: ${data[i]["Traffic Low"]}	<br>Traffic High: ${data[i]["Traffic High"]}`);}});

// function onMapClick(e) {
//   var circle = L.circle(latlng, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// });
// }

// myMap.on('click', onMapClick).addTo(myMap);

// function onMapClick(e) {
//   alert("You clicked the map at " + e.latlng);
// }

// myMap.on('click', onMapClick);

d3.json("/get14ers").then(function(data) { 
  var camp_lats = []
  var camp_longs = []
  var beer_lats = []
  var beer_longs = []
  var gas_lats = []
  var gas_longs = []
  var hotSprings_lats=[]
  var hotSprings_longs=[]
  var charger_lats= []
  var charger_longs= []
  var camp_list=[]
  var b_list=[]
  var g_list=[]
  var h_list=[]
  var ch_list=[]
  for(i=0; i<data.length; i++) {
    if(("Campsite Latitude" in data[i]) & ("Campsite Longitude" in data[i])){ 
      camp_lats.push(data[i]["Campsite Latitude"]);
      camp_longs.push(data[i]["Campsite Longitude"]);
      var campIcon = L.icon({
        iconUrl: '../static/img/camp.png',
        iconSize: [10, 10]
      });
      var camp_markers = L.marker([data[i]['Campsite Latitude'], data[i]['Campsite Longitude']], {        
        icon: campIcon}
         ).addTo(myMap).bindPopup(`<br><b>Campsite Name : ${data[i]["name"]}</b></br><br>Nearest 14er: ${data[i]["Mountain Peak"]}</br><br>Miles from 14er : ${data[i]["Distance from Campsite (mi)"]}</br>`)
    }
      camp_list.push(camp_markers)
      // console.log(camp_list)
    if(("Brewery Latitudes" in data[i]) & ("Brewery Longitudes" in data[i])) {
      beer_lats.push(data[i]["Brewery Latitudes"]);
      beer_longs.push(data[i]["Brewery Longitudes"]);
      var beerIcon = L.icon({
        iconUrl : "../static/img/beer.png",
        iconSize : [15,15]
      });
      var brewery_markers = L.marker([data[i]['Brewery Latitudes'], data[i]['Brewery Longitudes']], {  
        icon: beerIcon
      }).addTo(myMap).bindPopup(`<br><b>Brewery Name : ${data[i]["Brewery Name"]}</b></br><br>Brewery Address : ${data[i]["Brewery Address"]}</br><br>Brewery Website : ${data[i]["Brewery Website"]}</br><br>Nearest 14er : ${data[i]["Mountain Peak"]}</br>`)
      b_list.push(brewery_markers)
    }


    if(("Gas Station Latitude" in data[i]) & ("Gas Station Longitude" in data[i])) {
      var gasIcon = L.icon({
        iconUrl : "../static/img/Gas.png",
        iconSize : [10,10]
      });
      gas_lats.push(data[i]["Gas Station Latitude"]);
      gas_longs.push(data[i]["Gas Station Longitude"]);
      var g_markers = L.marker([data[i]['Gas Station Latitude'], data[i]['Gas Station Longitude']], {
        icon : gasIcon
      }).addTo(myMap).bindPopup(`<br><b>Gas Station Name : ${data[i]["Gas Station Name"]}</b></br><br>Nearest 14er : ${data[i]["Mountain Peak"]}</br><br>Miles From Mountain Peak : ${data[i]["Gas Station Distance from Mountain Peak (mi)"]}`)
      g_list.push(g_markers)
    }
    if(("Hot Spring Latitudes" in data[i]) & ("Hot Spring Longitudes" in data[i])) {
      hotSprings_lats.push(data[i]["Hot Spring Latitudes"]);
      hotSprings_longs.push(data[i]["Hot Spring Longitudes"]);

      var hotSpringsIcon = L.icon({
        iconUrl : "../static/img/hot_spring.png",
        iconSize : [20,20]
    });
      var h_markers = L.marker([data[i]["Hot Spring Latitudes"], data[i]["Hot Spring Longitudes"]], {
        icon : hotSpringsIcon
      }).addTo(myMap).bindPopup(`<br><b>Hot Spring Name : ${data[i]["Hot Spring Name"]}</b></br><br>Town : ${data[i]["Town"]}</br><br>Nearest 14er : ${data[i]["Mountain Peak"]}</br><br>Miles From Mountain Peak : ${data[i]["HS Distance From Mountain Peak (mi)"]}`)
    h_list.push(h_markers);
    }
  
    if(("Charging Station Latitude" in data[i]) & ("Charging Station Longitude" in data[i])) {
      charger_lats.push(data[i]["Charging Station Latitude"]);
      charger_longs.push(data[i]["Charging Station Longitude"]);

      var chargerIcon = L.icon({
        iconUrl : "../static/img/charger.png",
        iconSize : [20,20]
    });
      var c_markers = L.marker([data[i]["Charging Station Latitude"], data[i]["Charging Station Longitude"]], {
        icon : chargerIcon
      }).addTo(myMap).bindPopup(`<br><b>Charger Station Name : ${data[i]["Charger Station Name"]}</b></br><br>Nearest 14er : ${data[i]["Mountain Peak"]}</br><br>Miles From Mountain Peak : ${data[i]["Charging Distance from Mountain Peak (mi)"]}`)
    ch_list.push(c_markers)
    }
    };
    var c_layer = L.layerGroup(ch_list);
    var camp_layer = L.layerGroup(camp_list);
    var g_layer = L.layerGroup(g_list);
    var b_layer = L.layerGroup(b_list);
    var h_layer = L.layerGroup(h_list);
    var overlayMaps = {
      "Campsites" : camp_layer,
      "Charging Stations" : c_layer,
      "Gas Stations" : g_layer,
      "Breweries" : b_layer,
      "Hot Springs" : h_layer,
    };
    var baseMaps = {
      "Light Map" : lightMap,
      "Satellite Map" : satelliteMap,
      "Outdoors Map" : outdoorsMap
    };
    L.control.layers(baseMaps, overlayMaps, {
      collapsed : false
    }).addTo(myMap);
}); 



