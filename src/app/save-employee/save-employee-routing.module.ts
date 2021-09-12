import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveEmployeeComponent } from './save-employee.component';

const routes: Routes = [{
  path: '',
  component: SaveEmployeeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaveEmployeeRoutingModule { }
