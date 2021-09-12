import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-dialog',
  templateUrl: './pop-dialog.component.html',
  styleUrls: ['./pop-dialog.component.scss']
})
export class PopDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
