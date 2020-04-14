import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

    url='http://127.0.0.1:8000/movility/profile/';

    constructor(private http: HttpClient, private auth: AuthService){}

    /**
     * Get data from the Backend
     * 
     * @returns Observable with the search results
     */

    getUserProfile(): Observable<any> {
      return this.http.get(`${this.url}`);
    }
    
}