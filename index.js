let map, infoWindow;
let beachflag1, beachflag2;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary(
    "marker",
  );
  navigator.geolocation.getCurrentPosition((position) => {
    map = new Map(document.getElementById("map"), {
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 15,
      mapId: "c2191a630a735aa3", 
      disableDefaultUI: true,
    });
    infoWindow = new google.maps.InfoWindow();
  
    const welcomeButton = document.createElement("button");
  
    welcomeButton.textContent = "click to launch game";
    welcomeButton.classList.add("custom-map-control-button");
  
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(welcomeButton);
    welcomeButton.addEventListener("click", () => {
      // window.location.href = "https://launchar.app/launch/matthews-project?url=https%3A%2F%2Fmatt-teufel.github.io%2Fpurejs%2Fbasketball%2Findex.html";
      window.location.href = "https://launchar.app/launch/matthews-project?url=https%3A%2F%2Fmatt-teufel.github.io%2Fpurejs%2Fflowers%2Findex.html";
    });
     const bf1Image = document.createElement("img");

     bf1Image.src =
       "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
   
     beachflag1 = new AdvancedMarkerElement({
       map,
       position: { lat: 35.142591, lng: -120.639300 },
       content: bf1Image,
       title: "A marker using a custom PNG Image",
       id: "beach-flag-marker",
     });

     const bf2Image = document.createElement("img");

     bf2Image.src =
       "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

     beachflag2 = new AdvancedMarkerElement({
      map,
      position: { lat: 35.141305, lng: -120.637137 },
      content: bf2Image,
      title: "A marker using a custom PNG Image",
      id: "beach-flag-marker2",
    });


  })
}

function handleLocationError(
  browserHasGeolocation,
  infoWindow,
  pos
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;
export {};

setTimeout(()=>{initMap()}, 100);

setInterval(()=> {
  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const userLocation = new google.maps.LatLng(userLat, userLon);
    if(position && beachflag1 && beachflag2) {
      const distance = calculateDistance(position.coords.latitude, position.coords.longitude, beachflag1.position.lat, beachflag1.position.lng);
      console.log("distanc 1: ", distance);
      const distance2 = calculateDistance(position.coords.latitude, position.coords.longitude, beachflag2.position.lat, beachflag2.position.lng); 
      console.log("distance 2: ", distance2);
      if(distance < 10) { 
        console.log("we launching the game");
      }
    }
  })
}, 5000);




function calculateDistance(lat1, lon1, lat2, lon2) {  
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance * 1000; // Convert to meters
}

function checkDistanceToLandmark(landmarkLat, landmarkLon) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const distance = calculateDistance(userLat, userLon, landmarkLat, landmarkLon);

    if (distance <= 50) {
      console.log("You are within 50 meters of the landmark!");
    } else {
      console.log("You are more than 50 meters away from the landmark.");
    }
  }, function(error) {
    console.error("Error getting user location:", error);
  });
}




//     // locationButton.addEventListener("click", () => {
//     //   // Try HTML5 geolocation.
//     //   if (navigator.geolocation) {
//     //     navigator.geolocation.getCurrentPosition(
//     //       (position: GeolocationPosition) => {
//     //         const pos = {
//     //           lat: position.coords.latitude,
//     //           lng: position.coords.longitude,
//     //         };
  
//     //         infoWindow.setPosition(pos);
//     //         infoWindow.setContent("Location found.");
//     //         infoWindow.open(map);
//     //         map.setCenter(pos);
//     //       },
//     //       () => {
//     //         handleLocationError(true, infoWindow, map.getCenter()!);
//     //       }
//     //     );
//     //   } else {
//     //     // Browser doesn't support Geolocation
//     //     handleLocationError(false, infoWindow, map.getCenter()!);
//     //   }
//     // });