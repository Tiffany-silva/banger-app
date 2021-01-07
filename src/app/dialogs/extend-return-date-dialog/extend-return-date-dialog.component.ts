import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { add, parseISO } from 'date-fns';

@Component({
  selector: 'app-extend-return-date-dialog',
  templateUrl: './extend-return-date-dialog.component.html',
  styleUrls: ['./extend-return-date-dialog.component.scss']
})
export class ExtendReturnDateDialogComponent  {


  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  constructor(
    public dialogRef: MatDialogRef<ExtendReturnDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
   
      this.range = new FormGroup({
        extendDate: new FormControl(),
      });
      this.setdate();
      console.log(this.data.min)
     }
  
    ngOnInit(): void {  }

  minDate: Date;
  maxDate:Date;
  range:FormGroup;


  onNoClick(): void {
    this.dialogRef.close();
  }
  setdate(){
    this.maxDate=add(parseISO(this.data.min), {days:1});
    this.minDate=this.data.min;
  }
}
