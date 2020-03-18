import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, Polyline } from 'leaflet';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.page.html',
  styleUrls: ['./route-map.page.scss'],
})
export class RouteMapPage implements OnInit {

    origin: String;
    destination: String;

    constructor(private route: ActivatedRoute) {
    }

  ngOnInit() {
    this.route.queryParams.subscribe(test => {
        this.origin = test["origin"];
        this.destination = test["destination"];
    });
  }

  map: Map;

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {

    // In setView add latLng and zoom
    this.map = new Map('mapId').setView([42.339236, -8.461685], 11);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap © ionic LeafLet',
    }).addTo(this.map);

    marker([42.339236, -8.461685]).addTo(this.map)
      .bindPopup('Welcome to ÜBRE demo.')
      .openPopup();

    //Layer.getLatLangs(); //Returns the current geographical position of the marker.

    //TODO draw the route -->

  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

}