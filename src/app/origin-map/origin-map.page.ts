import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import * as L from 'leaflet';

@Component({
  selector: 'app-origin-map',
  templateUrl: './origin-map.page.html',
  styleUrls: ['./origin-map.page.scss'],
})
export class OriginMapPage implements OnInit {

  ngOnInit() {
  }

  map: L.Map;
  marker: L.Marker;  
  position: L.LatLng;
  pickupLocation: string;  

  deliveryLocation: string;
  destination_lat: string;
  destination_lng: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.deliveryLocation = this.router.getCurrentNavigation().extras.state.deliveryLocation;
        this.destination_lat = this.router.getCurrentNavigation().extras.state.destination_lat;
        this.destination_lng = this.router.getCurrentNavigation().extras.state.destination_lng;
      }
    });
  }

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap() {
    var ini_lat = 42.453336; //Latitud de Pontevedra centro
    var ini_long = -8.647132; //Longitud de Pontevedra centro

    this.map = L.map('mapOrigin').setView([ini_lat, ini_long], 9);

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
      autoClose: true,
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
    
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.position.lat}&lon=${this.position.lng}`)
    .then(res => res.json())
    .then(myJson => {
      this.marker.bindPopup(myJson.display_name).openPopup();
      //console.log(myJson.display_name);
      this.pickupLocation = myJson.display_name;
    }); 
  }

  
  locatePosition() {    
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
      this.cosasConMarcador();
      this.marker.setLatLng([e.latitude, e.longitude]).bindPopup("Estás aquí!").openPopup();      
    });
  }


  confirmPickupLocation() {
    let navigationextras: NavigationExtras = {
      state: {
        pickupLocation: this.pickupLocation,
        origin_lat: this.position.lat,
        origin_lng: this.position.lng,

        deliveryLocation: this.deliveryLocation,
        destination_lat: this.destination_lat,
        destination_lng: this.destination_lng
      }
    };
    this.router.navigate(["/app/tab1"], navigationextras);
  }

}
