import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
import { Users } from '../Users';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  //styleUrls: ['./home.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: any;
  user: Users;
  id: any;
  imagePath: string;
  expirydate: string;
  constructor(private formbulider: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
    private router: Router, private datePipe: DatePipe, public dialog: MatDialog) { this.user = new Users(); }

  ngOnInit() {
    document.getElementById("linkProfile").removeAttribute("class");
    document.getElementById("linkProfile").setAttribute("class", "list-inline-item active");

    this.profileForm = this.formbulider.group({
      id: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Containers: ['', [Validators.required]],
      expirydate: ['', [Validators.required]],
      companyname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      countrycode: ['', [Validators.required]],
      phnumber: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      currentpwd: ['', [Validators.required]],
      newpwd: ['', [Validators.required]],
      newpwd1: ['', [Validators.required]],
    });
    this.getUserDetails();
  }
  onFormSubmit() {
    this.user.id = this.id;
    this.user.f_name = ((document.getElementById("txtFirst") as HTMLInputElement).value);
    this.user.l_name = ((document.getElementById("txtLast") as HTMLInputElement).value);
    this.user.email = ((document.getElementById("txtEmail") as HTMLInputElement).value);
    this.user.total_container = ((document.getElementById("txtContain") as HTMLInputElement).value);
    this.user.company_name = ((document.getElementById("txtCompanyname") as HTMLInputElement).value);
    this.user.address = ((document.getElementById("txtAdd") as HTMLInputElement).value);
    this.user.zip_code = ((document.getElementById("txtZip") as HTMLInputElement).value);
    this.user.city_name = ((document.getElementById("txtcity") as HTMLInputElement).value);
    this.user.country_code = ((document.getElementById("txtcountrycode") as HTMLInputElement).value);
    this.user.phone_no = ((document.getElementById("txtph") as HTMLInputElement).value);
    this.user.cvr_no = ((document.getElementById("txtvat") as HTMLInputElement).value);
    this.user.country_name = ((document.getElementById("txtcountry") as HTMLInputElement).value);
    var pwd1 = ((document.getElementById("txtNewpwd") as HTMLInputElement).value);
    var pwd2 = ((document.getElementById("txtNewpwd1") as HTMLInputElement).value);
    if (pwd1 != "" && pwd2 != "" && pwd1 == pwd2) {
      this.user.passwordNew = pwd1;
    }
    else
      this.user.passwordNew = "";
    this.UpdateUsers(this.user);

  }
  UpdateUsers(user: Users) {
    if (this.id != null) {
      //alert();

      this.usersService.updateUsers(user).subscribe(res => { if (res == "1") this.showNotification('top', 'center'); else this.showErrorNotification('top', 'center','Error occurred, try again later');});
    }
  }
  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      data: "Do you confirm the deletion of your profile?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.usersService.deleteUser(this.id).subscribe(res => {
          localStorage.setItem("isLoggedIn", "false");
          localStorage.removeItem("user_id");
          this.router.navigateByUrl('/login');
        });

      }
    });
  }
  showNotification(from, align) {
    const type = ['', 'success'];

    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      message: "<b>Updations done successfully</b>"

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert_notify alert alert-success alert-with-icon" role="alert">' +
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
  getUserDetails() {
    debugger;
    var data = localStorage.getItem("user_id");
    if (data != null || data != "") {
      this.usersService.getdetails(data)
        .subscribe(res => {
          console.log(res);
          this.user = res;
          this.id = this.user.id;
          if (this.user.profile_pic == null)
            this.imagePath = 'assets/images/contact.png';
          else if (this.user.profile_pic == "contact.png")
            this.imagePath = 'assets/images/contact.png';
          else
            this.imagePath = 'assets/images/contact.png';
          var ddMMyyyy = this.datePipe.transform(this.user.expiry_date, "dd MMM yyyy");
          this.expirydate = "Your Plan will expire on " + ddMMyyyy;
          this.profileForm.controls['id'].setValue(this.user.id);
          this.profileForm.controls['FirstName'].setValue(this.user.f_name);
          this.profileForm.controls['LastName'].setValue(this.user.l_name);
          this.profileForm.controls['Email'].setValue(this.user.email);
          this.profileForm.controls['Containers'].setValue(this.user.total_container);
          this.profileForm.controls['expirydate'].setValue(this.user.expiry_date);
          this.profileForm.controls['companyname'].setValue(this.user.company_name);
          this.profileForm.controls['address'].setValue(this.user.address);
          this.profileForm.controls['zipcode'].setValue(this.user.zip_code);
          this.profileForm.controls['city'].setValue(this.user.city_name);
          this.profileForm.controls['country'].setValue(this.user.country_name);
          this.profileForm.controls['countrycode'].setValue(this.user.country_code);
          this.profileForm.controls['phnumber'].setValue(this.user.phone_no);
          this.profileForm.controls['vat'].setValue(this.user.cvr_no);
          this.profileForm.controls['currentpwd'].setValue(this.user.password);
        });
    }
  }
}
