import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.page.html',
  styleUrls: ['./origin.page.scss'],
})
export class OriginPage implements OnInit {

  pickupLocation: string;
  
  constructor() {}

  ngOnInit() {
  }

}
