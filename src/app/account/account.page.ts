import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  accountForm: FormGroup
  results: Observable<any>;
  information = null;

  constructor(
    public navCtrl: NavController,
    //public formBuilder: FormBuilder,
    private accountService: AccountService
  ) { 
    //this.accountForm = this.createAccountForm() 
  }

  ngOnInit() {
    this.accountService.getUserProfile().subscribe(result => {
      this.information = result;
    });
  }
/*
  private createAccountForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
  }*/

}