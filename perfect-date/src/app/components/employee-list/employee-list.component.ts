import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../models/employee";
import { Component, OnInit } from "@angular/core";
import { Router,ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService,
              private router: Router,private route:ActivatedRoute) {
    //
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
    console.log(this.employees);
  }

  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.employeeService.deleteEmployee(id)
          .subscribe(
            data => {
              Swal.fire({
                title: 'Success!',
                text: 'Deleted Successfully',
                icon: 'success',
              }).then(() => {
                this.reloadData();
              });
            },
            error => console.log(error));
      }
    });
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }
  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }
}

