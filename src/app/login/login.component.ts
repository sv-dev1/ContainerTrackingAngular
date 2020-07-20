import { Component, OnInit } from '@angular/core';
//import { LoginService } from './login.service';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
//import * as $ from 'jquery';
import { UsersService } from '../Users.service';
import { Users } from '../Users';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./home.component.scss'],
})
export class LoginComponent implements OnInit {

  //  constructor(private loginService: LoginService, private user : Users) { }
  dataSaved = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: any;
  shown: number = 0;
  constructor(private formbulider: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
    private router: Router) { this.user = new Users(); }
  ngOnInit() {
    this.loginForm = this.formbulider.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  onFormSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.usersService.login(this.f.UserName.value, this.f.Password.value)
      .subscribe(
        res => {
          if (res != "0") {
            var obj = res;
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('user_id', obj.split(',')[0]);
            localStorage.setItem('user_role', obj.split(',')[1]);
            localStorage.setItem('email', this.f.UserName.value);
            var user_role = localStorage.getItem('user_role');
            // alert(user_role);
            if (user_role == "1")
              this.router.navigate(['loglist']);
            else
              this.router.navigate(['Shipment']);
          }
          else this.showErrorNotification('top', 'center', '<b>Login Unsuccessful,check your credentials</b>');
        }
      );
  }
  showErrorNotification(from, align, text) {
    const type = ['danger'];

    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      message: text
    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert_notify alert alert-danger alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="mdi mdi-close"></i></button>' +
          '<span class="notify-icon"><i class="mdi mdi-bell-outline" data-notify="icon"></i> </span>' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  showhide() {
    debugger;
    $('#eye').toggleClass("mdi-eye mdi-eye-off");
    if (this.shown == 0) {
      this.shown = 1;
      var p = document.getElementById('exampleInputPassword1');
      p.setAttribute('type', 'text');
    } else {
      this.shown = 0;
      var p = document.getElementById('exampleInputPassword1');
      p.setAttribute('type', 'password');
    }
  }


}


