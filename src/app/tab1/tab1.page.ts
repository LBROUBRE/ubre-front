import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  results: Observable<any>;

  constructor(private router: Router, public loadingController: LoadingController) { }
  
  ngOnInit() {
  }

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
        "destination":(<HTMLInputElement>document.getElementById("destination_input")).value
      }
    };
    this.router.navigate(['/route-list'], navigationExtras);
  }
}