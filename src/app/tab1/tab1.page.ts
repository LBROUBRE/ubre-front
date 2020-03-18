import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  results: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  sendRequest() {
    var origin = (<HTMLInputElement>document.getElementById("origin_input")).value
    var destination = (<HTMLInputElement>document.getElementById("destination_input")).value
    this.results = this.http.get("http://localhost:8000/route/"+origin+"/"+destination);
    this.results.subscribe(res => console.log(res));
  }

}