import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.page.html',
  styleUrls: ['./route-list.page.scss'],
})
export class RouteListPage implements OnInit {
 // show: boolean = true
 hideList = true;
 
  @ViewChild('routeList', {static: false}) routeOrderRef: IonSelect;
  reorderRoutes() {
    this.routeOrderRef.open();
 }
 
 // rellenar array de routes con la info proveniente de la bbdd, que se llena mediante la demanda
 // o sea, suscribirse a rutas a modo de reservas hasta cumplir cierto umbral
  routes: Array<any> = [
    {
      routeID: "ROUTE_ID_1",
      polylineID: "POLYLINE_ID_1",
      origin: "Ubicación actual", 
      destination: "Av. Samil, 36212 Vigo",
      timeToDest: "22",
      price: "2,50",      
    },
    {
      routeID: "ROUTE_ID_2",
      polylineID: "POLYLINE_ID_2",
      origin: "Ubicación actual",
      destination: "Camiño Pertegueiras, 36212 Vigo",
      timeToDest: "29",
      price: "2,15",
    },
    {
      routeID: "ROUTE_ID_3",
      polylineID: "POLYLINE_ID_3",
      origin: "A 2 minutos da túa selección...",
      destination: "A 3 minutos de ...",
      timeToDest: "27",
      price: "1,85",
    }
  ]

  // sort by timeToDest and price functions

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showRouteInfo(polylineID: String) {
    this.router.navigate(['/route-map', polylineID]);
  }

}
