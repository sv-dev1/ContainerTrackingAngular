import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-footersection',
  templateUrl: './footersection.component.html',
  //styleUrls: ['./home.component.scss'],
})
export class FooterSectionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    var data = localStorage.getItem('isLoggedIn');
    
    if (data == "false" || data == null) {
      document.getElementById("alogN").style.display = "block";
      document.getElementById("aLogoutN").style.display = "none";
    }
    else {
      document.getElementById("aLogoutN").style.display = "block";
      document.getElementById("alogN").style.display = "none";
      document.getElementById("asignN").style.display = "none";
    }
  }
  logout() {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("user_id");
    this.router.navigate(['/login']);
  }
}
