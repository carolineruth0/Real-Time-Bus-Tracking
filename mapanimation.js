// Initialize and add the map
let map;
var markers = [];

async function initMap() {
  // The location 
  const position = { lat: 42.359244, lng: -71.093729 };

  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");

  // The map
  map = new Map(document.getElementById("map"), {
    zoom: 14,
    center: position,
    //mapId: "DEMO_MAP_ID",
    // Style came from google page: https://developers.google.com/maps/documentation/javascript/examples/style-selector
	styles : [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#c9b2a6" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [{ color: "#dcd2be" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ae9e90" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#93817c" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#a5b076" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#447530" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#fdfcf8" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f8c967" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e9bc62" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#e98d58" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [{ color: "#db8555" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#806b63" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8f7d77" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ebe3cd" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#b9d3c2" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#92998d" }],
    },
  ]
  });

  run();

}

initMap();

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	locations.forEach(function(bus){
		var marker = getMarker(bus.id);
		if (marker){
			marker.setPosition( {
    			lat: bus.attributes.latitude, 
    			lng: bus.attributes.longitude
			});
		}
		else{
			newMarker(bus,marker);
		}
	});

	// timer
	setTimeout(run, 30000);
}

function newMarker(bus){
	var marker = new google.maps.Marker({
	    position: {
	    	lat: bus.attributes.latitude, 
	    	lng: bus.attributes.longitude
	    },
	    map: map,
	    id: bus.id
	});
	markers.push(marker);
}

function getMarker(id){
	var marker = markers.find(function(item){
		return item.id === id;
	});
	return marker;
}

// Request bus data from MBTA
async function getBusLocations(){
	 const url = 'https://api-v3.mbta.com/vehicles?';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}