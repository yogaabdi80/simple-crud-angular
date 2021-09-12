import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../model/Employee';
import { PopDialogComponent } from '../pop-dialog/pop-dialog.component';
import { EmployeeService } from '../service/employee.service';
import { UtilService } from '../service/service-util.service';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.scss']
})
export class SaveEmployeeComponent implements OnInit, OnDestroy {

  constructor(private employeeService: EmployeeService, public router: Router, public dialog: MatDialog, private utilService: UtilService) {
    this.bsConfig.dateInputFormat = 'D MMMM YYYY';
    utilService.idEmployee$.subscribe(data => {
      this.idEmployee = data;
    })
  }

  ngOnDestroy(): void {
    this.utilService.setIdEmployee(null);
  }

  @ViewChild('form') form: NgForm;

  public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  employee: Employee = new Employee();
  idEmployee: number;
  isEdit:boolean = false;

  ngOnInit(): void {
    if (this.idEmployee) {
      this.isEdit = true;
      this.employeeService.getEmployee(this.idEmployee).subscribe(data => {
        this.employee = data.result;
        if (this.employee.birthDate) this.employee.birthDate = new Date(this.employee.birthDate);
        this.utilService.setLoadingScreen(false);
      }, error => {
        console.log(error);
        this.utilService.setLoadingScreen(false);
      });
    } else {
      this.employeeService.getPositions().subscribe(data => {
        this.employee.positionList = data;
        this.utilService.setLoadingScreen(false);
      }, error => {
        console.log(error);
        this.utilService.setLoadingScreen(false);
      })
    }
  }

  submit() {
    if (this.form.valid) {
      this.openDialog();
    }
    this.form.control.markAllAsTouched();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopDialogComponent, {
      width: '350px',
      data: { idEmployee: null, pointer: 'save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.utilService.setLoadingScreen(true);
      this.employeeService.saveEmployee(this.employee).subscribe(data => {
        if (data.status === 200) {
          this.router.navigate(['karyawanindex']);
        } else if (data.status === 99) {
          alert(data.message);
        }
        this.utilService.setLoadingScreen(false);
      }, error => {
        console.log(error);
        this.utilService.setLoadingScreen(false);
      });
    });
  }
}
