import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../Users.service';
declare var $: any;

@Component({
  selector: 'app-contectus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  profileForm: any;
  constructor(private formbulider: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.profileForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Subject: ['', [Validators.required]],
      Message: ['', [Validators.required]],
    });
  }
  onFormSubmit() {
    var data = JSON.stringify(this.profileForm.value);
    this.usersService.sendEmail(data).subscribe(res => { if (res == 1) { this.showNotification("top", "center"); this.profileForm.reset(); } else { console.log(res); this.showErrorNotification("top", "center"); } });
  }
  showNotification(from, align) {
    const type = ['', 'info', 'success'];

    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      message: "<b>An email has now been sent to Container Tracking and support will return as soon as possible with a reply.</b>"

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert alert_notify alert-{0} alert-with-icon" role="alert">' +
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
  showErrorNotification(from, align) {
    const type = ['', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      message: "<b>Error occurred, try again later.</b>"

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert alert_notify alert-{0} alert-with-icon" role="alert">' +
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
}
