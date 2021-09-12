import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopDialogComponent } from './pop-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [PopDialogComponent],
  exports: [PopDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule
  ]
})
export class PopDialogModule { }
