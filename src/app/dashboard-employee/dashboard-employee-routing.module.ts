import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardEmployeeComponent } from './dashboard-employee.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardEmployeeRoutingModule { }
