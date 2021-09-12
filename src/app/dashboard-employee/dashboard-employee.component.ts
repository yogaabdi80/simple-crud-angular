import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { EmployeeDashboard } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';
import { faMinusSquare, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { PopDialogComponent } from '../pop-dialog/pop-dialog.component';
import { UtilService } from '../service/service-util.service';

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.scss']
})
export class DashboardEmployeeComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  dtInstance: DataTables.Api;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  employeeMaster: EmployeeDashboard[] = [];
  faPenSquare = faPenSquare;
  faMinusSquare = faMinusSquare;

  constructor(private employeeService: EmployeeService, public router: Router, public dialog: MatDialog, private utilService: UtilService) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeMaster().subscribe(data => {
      if (data.status == 200) {
        this.employeeMaster = data.result;
        this.dtTrigger.next();
        this.utilService.setLoadingScreen(false);
        // this.dtOptions = {
        //   pagingType: 'full_numbers',
        //   pageLength: 10,
        //   columnDefs: [{ targets: [5, 6], type: 'de_datetime' }]
        // };
      }
      else
        alert(data.message);
    });
  }

  editEmployee(id: number){
    this.utilService.setIdEmployee(id);
    this.router.navigate(['karyawaneditadd']);
  }

  openDialog(idEmployee: number): void {
    const dialogRef = this.dialog.open(PopDialogComponent, {
      width: '350px',
      data: { idEmployee: idEmployee, pointer : 'delete' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.utilService.setLoadingScreen(true);
        this.employeeService.deleteEmployeeMaster(result).subscribe(data => {
          if (data.status === 200) {
            this.employeeMaster = data.result;
          } else {
            alert(data.message);
          }
          this.utilService.setLoadingScreen(false);
        }, error => {
          console.log(error);
          this.utilService.setLoadingScreen(false);
        });
      }
    });
  }



  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
