import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardEmployeeRoutingModule } from './dashboard-employee-routing.module';
import { DashboardEmployeeComponent } from './dashboard-employee.component';
import { DataTablesModule } from 'angular-datatables';
import { EmployeeService } from '../service/employee.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { PopDialogModule } from '../pop-dialog/pop-dialog.module';


@NgModule({
  declarations: [DashboardEmployeeComponent],
  imports: [
    CommonModule,
    DashboardEmployeeRoutingModule,
    DataTablesModule,
    FontAwesomeModule,
    MatDialogModule,
    PopDialogModule
  ], providers : [
    EmployeeService
  ]
})
export class DashboardEmployeeModule { }
