import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Map, tileLayer, marker } from "leaflet";
import {NativeGeocoder,NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";

@Component({
  selector: 'app-origin-map',
  templateUrl: './origin-map.page.html',
  styleUrls: ['./origin-map.page.scss'],
})
export class OriginMapPage implements OnInit {

  ngOnInit() {
  }

  map: Map;
  newMarker: any;
  address: string[];

  constructor(private geocoder: NativeGeocoder, private router: Router) {}

  // The below function is added
  ionViewDidEnter(){
    this.loadMap();
  }

  // The below function is added
  loadMap() {
    // In setView add latLng and zoom
    this.map = new Map('mapOrigin').setView([42.339236, -8.461685], 7);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
    .addTo(this.map);

    marker([42.339236, -8.461685], {
      draggable: true
    }).addTo(this.map).bindPopup('Welcome to ÜBRE demo.').openPopup();
  }
  
  locatePosition() {
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
      this.newMarker = marker([e.latitude, e.longitude], {
        draggable: true
      }).addTo(this.map);

      this.newMarker.bindPopup("You are located here!").openPopup();
      this.getAddress(e.latitude, e.longitude);
   
      this.newMarker.on("dragend", () => {
        const position = this.newMarker.getLatLng();
        this.getAddress(position.lat, position.lng);
       
      });
    });
  }
 

  getAddress(lat: number, long: number) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geocoder.reverseGeocode(lat, long, options).then(results => {
      this.address = Object.values(results[0]).reverse();
      
    });
  }
// The function below is added
  confirmPickupLocation() {
    let navigationextras: NavigationExtras = {
      state: {
        pickupLocation: this.address
      }
    };
    this.router.navigate(["origin"], navigationextras);
  }

}
