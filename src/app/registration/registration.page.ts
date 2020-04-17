import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  register(form){

    var user = '{"email": "'+form.value.email +
    '" , "password": "' + form.value.password +
    '" , "profile": { "dni": "'+ form.value.dni +
    '" , "name": "'+ form.value.name + 
    '" , "last_name": "' + form.value.lastName +
    '" , "tlf": "' + form.value.tlf + 
    '" , "age":' + form.value.age + 
    ', "gender": "' + form.value.gender + '"}}';

    this.auth.register(user).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl('/login');
    });

  }

}