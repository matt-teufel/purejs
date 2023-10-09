/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

function initMap(): void {
    let userLocation = navigator.geolocation
    .getCurrentPosition((position: GeolocationPosition) => {
     const pos = {
       lat: position.coords.latitude,
       lng: position.coords.longitude,
     }
     map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: pos,
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


     });
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


    // locationButton.addEventListener("click", () => {
    //   // Try HTML5 geolocation.
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position: GeolocationPosition) => {
    //         const pos = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //         };
  
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent("Location found.");
    //         infoWindow.open(map);
    //         map.setCenter(pos);
    //       },
    //       () => {
    //         handleLocationError(true, infoWindow, map.getCenter()!);
    //       }
    //     );
    //   } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter()!);
    //   }
    // });