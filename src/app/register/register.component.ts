import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
import { Users } from '../Users';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Settings } from '../settings';
import { Notifications } from '../notifications';
import { Notification } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm: any;
  SelectedFile: File = null;
  nrSelect1: any;
  user: any;
  shown1: number = 0;
  shown2: number = 0;
  constructor(private Http: HttpClient, private formbulider: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
    private router: Router, private datePipe: DatePipe) { this.user = new Users(); }

  ngOnInit() {
    this.profileForm = this.formbulider.group({
      //profile_pic: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      ConfirmEmail: ['', [Validators.required]],
      companyname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      countrycode: ['', [Validators.required]],
      phnumber: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  selectChangeHandler1(val) {
    //update the ui
    this.nrSelect1 = val;
    
  }
  onFileSelected(files: File[]) {
    this.SelectedFile = files[0];
  }
  onFormSubmit() {
    if (this.profileForm.invalid) {
      alert('Kindly fill the entire form');
      return;
    }
    else {
      //  const userStr = JSON.stringify(this.profileForm.value);
      //const fd = new FormData();
      //fd.append('image', this.SelectedFile, this.SelectedFile.name);
      //this.Http.post('http://localhost:62172/uploadImage/', fd).subscribe(res => { console.log(res); })
      this.user.f_name = ((document.getElementById("txtFirst") as HTMLInputElement).value);
      this.user.l_name = ((document.getElementById("txtLast") as HTMLInputElement).value);
      this.user.email = ((document.getElementById("txtEmail") as HTMLInputElement).value);
      var confirmEmail = ((document.getElementById("txtconfirmEmail") as HTMLInputElement).value);
      if (this.user.email != confirmEmail) {
        alert('Email and confirm Email must match!');
        return;
      }
      this.user.password = ((document.getElementById("txtPwd") as HTMLInputElement).value);
      var confirmPwd = ((document.getElementById("txtConfirmpwd") as HTMLInputElement).value);
      if (this.user.password != confirmPwd) {
        alert('Password and confirm password must match!');
        return;
      }
      this.user.total_container = 0;
      this.user.company_name = ((document.getElementById("txtCompanyname") as HTMLInputElement).value);
      this.user.address = ((document.getElementById("txtAdd") as HTMLInputElement).value);
      this.user.zip_code = ((document.getElementById("txtZip") as HTMLInputElement).value);
      this.user.city_name = ((document.getElementById("txtcity") as HTMLInputElement).value);
      this.user.country_code = ((document.getElementById("txtcountrycode") as HTMLInputElement).value);
      this.user.phone_no = ((document.getElementById("txtph") as HTMLInputElement).value);
      this.user.cvr_no = ((document.getElementById("txtvat") as HTMLInputElement).value);
      this.user.country_name = ((document.getElementById("txtcountry") as HTMLInputElement).value);
      //this.user.profile_pic = this.SelectedFile.name == "" ? "contact.png" : this.SelectedFile.name;
      this.user.profile_pic = "contact.png";
      this.user.user_role = this.nrSelect1 == null ? "2" : this.nrSelect1;
      this.user.status = 1;
      this.user.expiry_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.user.signup_status = 0;
      // alert(this.user.user_role);

      this.usersService.insertUsers(this.user).subscribe(res =>
      {
        if (res == "1") { this.showNotification('top', 'center', '<b>Registration done successfully</b>'); this.profileForm.reset(); }
        else if (res == "Email or Company Name already exists!") this.showErrorNotification('top', 'center', '<b>Email or Company Name already exists, if forgot password send email to jesper@containertracking.dk</b>');
        else {
          this.showErrorNotification('top', 'center', '<b>Error occurred, try again later</b>'); this.profileForm.reset();
        }
      });
     
    }

  }
  showNotification(from, align,text) {
    const type = ['', 'success'];

    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      // message: "<b>Registration done successfully</b>"
      message: text
    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert_notify alert alert-{0} alert-with-icon" role="alert">' +
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
  showErrorNotification(from, align, text) {
    const type = ['', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      // message: "<b>Registration done successfully</b>"
      message: text
    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert_notify alert alert-{0} alert-with-icon" role="alert">' +
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
    $('#eyePwd').toggleClass("mdi-eye mdi-eye-off");
    if (this.shown1 == 0) {
      this.shown1 = 1;
      var p = document.getElementById('txtPwd');
      p.setAttribute('type', 'text');
    } else {
      this.shown1 = 0;
      var p = document.getElementById('txtPwd');
      p.setAttribute('type', 'password');
    }
  }
  showhide1() {
    $('#eyeconfirmPwd').toggleClass("mdi-eye mdi-eye-off");
    if (this.shown2 == 0) {
      this.shown2 = 1;
      var p = document.getElementById('txtConfirmpwd');
      p.setAttribute('type', 'text');
    } else {
      this.shown2 = 0;
      var p = document.getElementById('txtConfirmpwd');
      p.setAttribute('type', 'password');
    }
  }
}
