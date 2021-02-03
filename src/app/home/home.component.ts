import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { eachDayOfInterval, add, parseISO, formatISO9075 } from 'date-fns';
import { Booking } from '../entity.Models/booking';
import { Vehicle } from '../entity.Models/vehicle';
import { BookingService } from '../services/booking/booking.service';
import { VehicleService } from '../services/vehicle/vehicle.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public vehicleList: Vehicle[] = [];
  availableList:Vehicle[]=[];
  minDate: Date;
  maxDate:Date;
  range:FormGroup;
  availableVehicles:Boolean=false;
  error:any;

  constructor(private vehicleService:VehicleService, private bookingService:BookingService) {


    this.minDate = new Date();

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
    this.getAllVehicles();

   }

  ngOnInit(): void {
  }

  setMaxDate(){
    if(this.range.controls.start.value){
      this.maxDate=add(this.range.controls.start.value, {days: 14});
    }
    return this.maxDate;
  }

  getAllVehicles(){
    this.vehicleService.getAllVehicles().subscribe(data=>{
      console.log(data);
      data.forEach((element: any) => {
        if(element.quantity == 0){
          element.available=false;
        }else{
          element.available=true;
        }
      });
      this.vehicleList=data;
      console.log(this.vehicleList)
      console.log(this.vehicleList[1].id)
    })

  }


  checkAvailableVehicles(start:any, end:any){
    if(start==null && end==null){
      this.error="Please select a date range";
    }else{
      this.error=null;
      this.availableVehicles=true;
      let ss=formatISO9075(start);
      let ee=formatISO9075(end);

      console.log(ss);
      console.log(ee);
      let req={startdate: ss, enddate:ee}
      this.bookingService.getAvailableVehicles(req).subscribe(availableList=>{
        availableList.forEach((element: any) => {
          if(element.quantity == 0){
            element.available=false;
          }else{
            element.available=true;
          }
        });
        this.availableList=availableList;

      })
    }

  }

  getDatesInRange(start:any,end:any){
    var result = eachDayOfInterval({
      start: start,
      end: end
    })
    return result;
  }

}
