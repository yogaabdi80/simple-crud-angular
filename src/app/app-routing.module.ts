import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'karyawanindex', pathMatch: 'full' },
  {
    path: '', component: DefaultLayoutComponent, children: [
      {
        path: 'karyawanindex',
        loadChildren: () => import("../app/dashboard-employee/dashboard-employee.module").then(m => m.DashboardEmployeeModule)
      },
      {
        path: 'karyawaneditadd',
        loadChildren: () => import("../app/save-employee/save-employee.module").then(m => m.SaveEmployeeModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
