(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */function l(){const n=new google.maps.Map(document.getElementById("map"),{zoom:5,center:{lat:24.886,lng:-70.268},mapTypeId:"terrain"}),r=[{lat:25.774,lng:-80.19},{lat:18.466,lng:-66.118},{lat:32.321,lng:-64.757}];new google.maps.Polygon({paths:r,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:3,fillColor:"#FF0000",fillOpacity:.35}).setMap(n)}window.initMap=l;