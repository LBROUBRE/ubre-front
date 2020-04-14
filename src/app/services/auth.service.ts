import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  public token;
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) { 
    this.loadStoredToken();  
  }
 
  loadStoredToken() {
    let platformObs = from(this.plt.ready());
 
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token);
          localStorage.setItem('jwt-token', token); // añade el token al local storage para que se pueda obtener desde otra página
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
    
  }
 
  login(credentials: {email: string, password: string }) {
 
    return this.http.post('http://127.0.0.1:8000/movility/signin', credentials).pipe(
      take(1),
      map(res => {
        return res['token'];
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
        this.userData.next(decoded);
        let storageObs = from(this.storage.set(TOKEN_KEY, token));
        return storageObs;
      })
    );
  }

  register(user){
    console.log(user);
    return this.http.post('http://127.0.0.1:8000/movility/signup', user).pipe(
    take(1),
    map(res => {
      return res;
    })
    )
  }

  getUser(){ // Retorna el id, username, email, etc.
    return this.userData.getValue();
  }

  getToken(){
    console.log(this.token)
    return this.token;

  }
 
  logout() {
    localStorage.removeItem('jwt-token');
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
 
}