import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.password = '';
    this.user.emailId = '';
  }

  save() {
    this.userService.registration(this.user)
      .subscribe(data => {
          //localStorage.setItem('access_token', data.access_token);
          Swal.fire({
            title: 'Success!',
            text: 'Registration Successful',
            icon: 'success',
          }).then(() => {
            this.gotoList();
          });
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
    // this.submitted = true;
    this.save();
  }

  gotoList() {
   // this.router.navigate(['/employees']);

    window.location.href = '/employees';
  }

}
