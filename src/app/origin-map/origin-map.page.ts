import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import {NativeGeocoder,NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

@Component({
  selector: 'app-origin-map',
  templateUrl: './origin-map.page.html',
  styleUrls: ['./origin-map.page.scss'],
})
export class OriginMapPage implements OnInit {

  ngOnInit() {
  }

  map: L.Map;
  newMarker: any;
  address: string[];

  constructor(private geocoder: NativeGeocoder, private router: Router) {}

  // The below function is added
  ionViewDidEnter(){
    this.loadMap();
  }

  // The below function is added
  loadMap() {
    this.map = L.map('mapOrigin').setView([42.339236, -8.461685], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  
    /*
    var searchControl = L.esri.Geocoding.geosearch().addTo(this.map);
  
    var results = L.layerGroup().addTo(this.map);
  
    searchControl.on('results', function (data) {
      results.clearLayers();
      for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });
    */
  }



  
  locatePosition() {
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
      this.newMarker = L.marker([e.latitude, e.longitude], {
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
