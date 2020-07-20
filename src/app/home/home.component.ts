import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';

declare var $: any;

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private usersService: UsersService) { }

  public onloadscript() {
    console.log('preparing loading...')
    let node = document.createElement('script');
    node.src = "src/assets/js/owl.carousel.js";
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  };
  public loadScript() {
    console.log('prepared loading...')
    let node = document.createElement('script');
    node.src = "assets/js/home.js";
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    //document.getElementsByTagName('head')[1].appendChild(node);
  };
  SendEmail() {

    var cmpname = ((document.getElementById("cmp_name") as HTMLInputElement).value);
    if (cmpname == "") {
      document.getElementById("addlist_error").style.display = "block";
      return;
    }
    var firstname = ((document.getElementById("first_name") as HTMLInputElement).value);
    if (firstname == "") {
      document.getElementById("addlist_error").style.display = "block";
      return;
    }

    var email = ((document.getElementById("email") as HTMLInputElement).value);
    if (email == "") {
      document.getElementById("addlist_error").style.display = "block";
      return;
    }

    var lastname = ((document.getElementById("last_name") as HTMLInputElement).value);
    var phonenumber = ((document.getElementById("phone_number") as HTMLInputElement).value);
    var website = ((document.getElementById("website") as HTMLInputElement).value);
    this.usersService.SendBookDemo(email, firstname, lastname, phonenumber, website, cmpname).subscribe(res => {
      $("#Booking").modal("hide");
      this.showNotification("top", "center");
      document.getElementById("addlist_error").style.display = "none";
      (<HTMLInputElement>document.getElementById('cmp_name')).value = '';
      (<HTMLInputElement>document.getElementById('first_name')).value = '';
      (<HTMLInputElement>document.getElementById('email')).value = '';
      (<HTMLInputElement>document.getElementById('last_name')).value = '';
      (<HTMLInputElement>document.getElementById('website')).value = '';
      (<HTMLInputElement>document.getElementById('phone_number')).value = '';
    });
  
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
}
