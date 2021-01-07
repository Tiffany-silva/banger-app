import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../user-clerk/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-delete-item-dialog',
  templateUrl: './delete-item-dialog.component.html',
  styleUrls: ['./delete-item-dialog.component.scss']
})
export class DeleteItemDialogComponent  {

  item:any;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      this.item=data.item;
      console.log(this.item);
     }

onNoClick(): void {
this.dialogRef.close();
}


}
