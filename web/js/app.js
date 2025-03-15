let map;
let autocomplete;

function initMap() {
  // Default location (fallback if geolocation fails)
  const defaultLocation = { lat: 0, lng: 0 };

  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 12,
  });

  // Request user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Center the map on the user's location
        map.setCenter(userLocation);

        // Add a marker at the user's location
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "You are here!",
        });

        // Draw a 5 km radius circle
        new google.maps.Circle({
          map: map,
          center: userLocation,
          radius: 5000, // 5 km in meters
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeOpacity: 0.5,
          strokeWeight: 2,
        });
      },
      () => {
        alert("Geolocation permission denied. Showing default location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  // Add the search box functionality
  addSearchBox();
}

function addSearchBox() {
  const input = document.getElementById("search-input");

  if (!google.maps.places) {
    console.error("Google Maps Places library is not loaded");
    return;
  }

  // Initialize the Autocomplete feature
  autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"], // Filter to geographical locations
  });
  autocomplete.bindTo("bounds", map);

  // Listen for the place_changed event
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      alert("No details available for the selected location.");
      return;
    }

    // Move the map to the selected location
    map.setCenter(place.geometry.location);
    map.setZoom(14);

    // Add a marker at the selected location
    new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name || "Selected Location",
    });
  });
}

// Attach the initMap function to the global window object
window.initMap = initMap;
