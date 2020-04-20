import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string="";

  credentials = {
    email:'',
    password: ''
  }

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  login(){
    this.credentials.email=this.email;
    this.credentials.password=this.password;
    this.auth.login(this.credentials).subscribe(async res => {
      if(res) {
        this.router.navigateByUrl('/viajes');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials',
          buttons: ['Ok']
        });
        await alert.present();
      }
    })
  }
  
}
