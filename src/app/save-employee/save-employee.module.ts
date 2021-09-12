import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SaveEmployeeRoutingModule } from './save-employee-routing.module';
import { SaveEmployeeComponent } from './save-employee.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PopDialogModule } from '../pop-dialog/pop-dialog.module';
import { EmployeeService } from '../service/employee.service';
import { NumericDirective } from '../numeric-directive/numeric.directive';


@NgModule({
  declarations: [SaveEmployeeComponent, NumericDirective],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    PopDialogModule,
    BsDatepickerModule.forRoot(),
    SaveEmployeeRoutingModule
  ], providers: [
    EmployeeService
  ]
})
export class SaveEmployeeModule { }
