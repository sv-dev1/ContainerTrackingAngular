import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../Users.service';
@Component({
  selector: 'app-innerheadersection',
  templateUrl: './innerheadersection.component.html',
  //styleUrls: ['./home.component.scss'],
})
export class InnerHeaderSectionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) { }

  ngOnInit() {

    var data = localStorage.getItem('isLoggedIn');
    var user_role = localStorage.getItem('user_role');
   // alert(user_role);
    // alert(data);
    if (data == "false" && user_role != "1") {
      this.router.navigate(['/']);
    }
  }
  logout() {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("user_id");
    var data = localStorage.getItem('email');
    this.usersService.updateUserlog(data).subscribe();
    //this.router.navigate(['/']);
  }
}
