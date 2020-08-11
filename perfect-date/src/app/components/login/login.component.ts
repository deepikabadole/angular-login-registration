import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: User = new User();

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  save() {
    this.userService.login(this.loginData)
      .subscribe(data => {
          localStorage.setItem('access_token', data.access_token);
           this.gotoList();
        }, error => {

          Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
          });
        }
      );
  }

  onSubmit() {
    this.save();
  }

  gotoList() {
    window.location.href = '/employees';
    //this.router.navigate(['/employees']);
  }

}
