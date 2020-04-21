import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  results: Observable<any>;

  pickupLocation: string;
  origin_lat: number;
  origin_lng: number;

  deliveryLocation: string;
  destination_lat: number;
  destination_lng: number;

  constructor(public httpClient: HttpClient, private router: Router, private route: ActivatedRoute, public loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pickupLocation = this.router.getCurrentNavigation().extras.state.pickupLocation;
        this.origin_lat = this.router.getCurrentNavigation().extras.state.origin_lat;
        this.origin_lng = this.router.getCurrentNavigation().extras.state.origin_lng;

        this.deliveryLocation = this.router.getCurrentNavigation().extras.state.deliveryLocation;
        this.destination_lat = this.router.getCurrentNavigation().extras.state.destination_lat;
        this.destination_lng = this.router.getCurrentNavigation().extras.state.destination_lng;
      }
      console.log("pickupLocation: " + this.pickupLocation);
      console.log("(" + this.origin_lat + "," + this.origin_lng + ")");

      console.log("deliveryLocation: " + this.deliveryLocation);
      console.log("(" + this.destination_lat + "," + this.destination_lng + ")");
    });
  }  
  
  ngOnInit() {
  }

  goToOriginMap(){
    let navigationextras: NavigationExtras = {
      state: {
        pickupLocation: this.pickupLocation,
        origin_lat: this.origin_lat,
        origin_lng: this.origin_lng,
        deliveryLocation: this.deliveryLocation,
        destination_lat: this.destination_lat,
        destination_lng: this.destination_lng
      }
    };
    this.router.navigate(["/origin-map"], navigationextras);
  }

  goToDestinationMap(){
    let navigationextras: NavigationExtras = {
      state: {
        pickupLocation: this.pickupLocation,
        origin_lat: this.origin_lat,
        origin_lng: this.origin_lng,
        deliveryLocation: this.deliveryLocation,
        destination_lat: this.destination_lat,
        destination_lng: this.destination_lng
      }
    };
    this.router.navigate(["/destination-map"], navigationextras);
  }

  /*
  async sendRequest() {
    const loading = await this.loadingController.create({
      message: 'Un momentiño, por favor...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "origin":(<HTMLInputElement>document.getElementById("origin_input")).value,
        "destination":(<HTMLInputElement>document.getElementById("destination_input")).value,
        "pickup_date":(<HTMLInputElement>document.getElementById("pickup_date_input")).value
      }
    };
    this.router.navigate(['/route-list'], navigationExtras);
  }
  */


  sendPostRequest() {

      var myHeaders = new HttpHeaders();
      myHeaders.append("Accept", 'application/json');
      myHeaders.append('Content-Type', 'application/json' );

      let postData = {
        "origin":(<HTMLInputElement>document.getElementById("origin_input")).value,
        "destination":(<HTMLInputElement>document.getElementById("destination_input")).value,
        "pickup_date":(<HTMLInputElement>document.getElementById("pickup_date_input")).value,
        "ID_user": null //hay que pillarlo de la base de datos
      }
      
      var URL = "http://localhost:8000/movility/requests/";
      var backend_response = this.httpClient.post(URL, postData, {headers: myHeaders})
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });

      //var ID_solicitud = "";

      let navigationExtras: NavigationExtras = { // con esto podemos enviar el parámetro "ID_solicitud" a otra página
        state: {
          id: backend_response["id"]
        }
      };

      this.router.navigate(['/route-list'], navigationExtras);
  }  

}