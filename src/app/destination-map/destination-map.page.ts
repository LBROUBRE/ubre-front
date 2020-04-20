import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import * as L from 'leaflet';

@Component({
  selector: 'app-destination-map',
  templateUrl: './destination-map.page.html',
  styleUrls: ['./destination-map.page.scss'],
})
export class DestinationMapPage implements OnInit {

  ngOnInit() {
  }

  map: L.Map;
  marker: L.Marker;  
  position: L.LatLng;
  address: string;  

  constructor(private router: Router) {}

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap() {
    var ini_lat = 42.341689; //Latitud de Fornelos de Montes centro
    var ini_long = -8.452490; //Longitud de Fornelos de Montes centro

    this.map = L.map('mapDestination').setView([ini_lat, ini_long], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.marker = L.marker([ini_lat, ini_long], {
      draggable: true
    }).addTo(this.map);

    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      searchLabel: 'Escribe unha dirección',
      autoClose: false,
      showMarker: false
    });
    this.map.addControl(searchControl);  

    this.cosasConMarcador();

    /////////////////////////////////////////////////////////////////////

    // Esto se activa cuando se arrastra el marcador por el mapa
    this.marker.on("dragend", () => {
      this.cosasConMarcador();
    });
    //Esto se activa cuando hago click en alguna de las sugerencias que me da el cuadro para buscar direcciones
    this.map.on('geosearch/showlocation', (e: any) => {
      this.marker.setLatLng([e.location.y, e.location.x]);
      this.cosasConMarcador();
    });
  }

  cosasConMarcador(){
    this.position = this.marker.getLatLng();
    
    fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${this.position.lng},${this.position.lat}`)
    .then(res => res.json())
    .then(myJson => {
      this.marker.bindPopup(myJson.address.LongLabel).openPopup();
      console.log(myJson.address);
      this.address = myJson.address.LongLabel;
    }); 
  }

  
  locatePosition() {    
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
      this.cosasConMarcador();
      this.marker.setLatLng([e.latitude, e.longitude]).bindPopup("Estás aquí!").openPopup();      
    });
  }


  confirmDeliveryLocation() {
    let navigationextras: NavigationExtras = {
      state: {
        deliveryLocation: this.address
      }
    };
    this.router.navigate(["/app/tab1"], navigationextras);
  }

}
