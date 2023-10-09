// /**
//  * @license
//  * Copyright 2019 Google LLC. All Rights Reserved.
//  * SPDX-License-Identifier: Apache-2.0
//  */
// import { Loader } from "@googlemaps/js-api-loader";

// // Note: This example requires that you consent to location sharing when
// // prompted by your browser. If you see the error "The Geolocation service
// // failed.", it means you probably did not give permission for the browser to
// // locate you.

// const loader = new Loader({
//   apiKey: "AIzaSyDKqJC4dkD_xkdDVOpI38m3nJr3uuRXq7Q", 
//   version: "weekly",
// })
// console.log("global loader ");

let map: google.maps.Map, infoWindow: google.maps.InfoWindow;
// const center = { lat: 41.90476224706472, lng: 12.49822074385094 };
// const zoom = 14;
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("in the dom function");
//   const wrapper = document.getElementById("wrapper") as HTMLButtonElement;

//   wrapper.addEventListener("click", () => {
//     wrapper.remove();

//     loader.load().then(() => {
//       map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//         center,
//         zoom,
//       });
//     });
//   });
// });


async function initMap() {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  await navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    map = new Map(document.getElementById("map") as HTMLElement, {
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
      window.location.href = "./basketball/index.html";
     });
  })

    // navigator.geolocation
    // .getCurrentPosition((position: GeolocationPosition) => {
    //  const pos = {
    //    lat: position.coords.latitude,
    //    lng: position.coords.longitude,
    //  }
    //  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    //   center: pos,
    //   zoom: 15,
    //   mapId: "c2191a630a735aa3", 
    //   disableDefaultUI: true,
    // });
}

function handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

initMap();


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