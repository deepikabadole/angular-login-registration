import {Component, OnInit} from '@angular/core';
import {Employee} from '../../models/employee';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;
  submitted = false;
  files: any;

  constructor(private route: ActivatedRoute, private router: Router,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params["id"];

    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data);
        this.employee.id = data.id;
        this.employee.firstName = data.first_name;
        this.employee.lastName = data.last_name;
        this.employee.emailId = data.email;
      }, error => console.log(error));
  }

  handleFileInput(event) {
    this.files = event.target.files[0];
  }

  updateEmployee() {
    console.log(this.files);
    let formdata = new FormData();
    formdata.append("image", this.files);
    formdata.append("firstName", this.employee.firstName);
    formdata.append("lastName", this.employee.lastName);
    formdata.append("emailId", this.employee.emailId);
    this.employeeService.updateEmployee(this.id, formdata)
      .subscribe(data => {
          Swal.fire({
            title: 'Success!',
            text: 'Updated Successfully',
            icon: 'success',
          }).then(() => {
            this.gotoList();
          });
        },
        error => console.log(error));
  }

  onSubmit() {
    this.updateEmployee();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
