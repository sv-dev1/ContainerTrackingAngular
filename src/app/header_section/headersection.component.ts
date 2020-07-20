import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-headersection',
  templateUrl: './headersection.component.html',
  //styleUrls: ['./home.component.scss'],
})
export class HeaderSectionComponent implements OnInit {
  @ViewChild('alog') alog: ElementRef;
  @ViewChild('aLogout') aLogout: ElementRef;
  @ViewChild('linkShipment') linkShipment: ElementRef;
  @ViewChild('asign') asign: ElementRef;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    var data = localStorage.getItem('isLoggedIn');
    var user_role = localStorage.getItem('user_role');
    if (data == "false" || data == null) {
      this.alog.nativeElement.style.display = "block";
      this.aLogout.nativeElement.style.display = "none";
      this.linkShipment.nativeElement.style.display  = "none";
    }
    else {
      if (user_role == "1")
      {
        this.linkShipment.nativeElement.style.display = "none";
      }
      this.aLogout.nativeElement.style.display = "block";
      this.alog.nativeElement.style.display = "none";
      this.asign.nativeElement.style.display = "none";
    }
  }
  logout() {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("user_id");
    this.router.navigate(['/login']);
  }

}
