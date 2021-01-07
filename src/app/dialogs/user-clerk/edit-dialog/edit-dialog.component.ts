import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/entity.Models/booking';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  bookingStatus:Status[]=[Status.BOOKED, Status.CANCELLED, Status.COMPLETED, Status.EXTENDED, Status.PICKED];
  myForm:any;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      console.log(data)
      
    }

    getStatus(){
      if(this.data.blackListed==true){
        return "Blacklisted";
      }else{
        return "Not Blacklisted";
      }
    }

onNoClick(): void {
this.dialogRef.close();
}

  ngOnInit(): void {
  }

}
