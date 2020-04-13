import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  results: Observable<any>;

  constructor(public httpClient: HttpClient, private router: Router, public loadingController: LoadingController) { }
  
  ngOnInit() {
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
      "pickup_date":(<HTMLInputElement>document.getElementById("pickup_date_input")).value
    }

    this.httpClient.post("http://127.0.0.1:3000/customers", postData, {headers: myHeaders})
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });

    this.router.navigate(['/route-list']);  
    
  }

  

}