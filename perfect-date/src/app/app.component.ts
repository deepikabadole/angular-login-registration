import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {User} from "./models/user";
import {Employee} from "./models/employee";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  baseUrl = 'http://localhost/angular/perfect-date-api';
  title = 'perfect-date';
  navShow = false;

  authUser : User;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.authUser = new User();

    if (this.userService.getToken()) {
      this.navShow = true;
      this.getAuthUser();

    }
  }

  getAuthUser(){
    this.userService.getAuthUser()
      .subscribe(data => {
        this.authUser.id = data.id;
        this.authUser.firstName = data.first_name;
        this.authUser.lastName = data.last_name;
        this.authUser.emailId = data.email;
        this.authUser.profileImage = this.baseUrl+'/public/storage/profile-images/'+data.profile_image;
        }
      );
  }

  logout() {
    this.userService.logout()
      .subscribe(data => {
          localStorage.setItem('access_token', '');
          window.location.href = '/login';
        }
      );
  }

}

