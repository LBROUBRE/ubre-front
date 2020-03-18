import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  results: Observable<any>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendRequest() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "origin":(<HTMLInputElement>document.getElementById("origin_input")).value,
        "destination":(<HTMLInputElement>document.getElementById("origin_input")).value
      }
    };
    this.router.navigate(['/route-map'], navigationExtras);
  }

}