import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle/vehicle.service';
import { add, differenceInCalendarDays, eachDayOfInterval, formatISO, formatISO9075, parse, parseISO} from 'date-fns';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { BookingService } from '../services/booking/booking.service';
import { Booking, Status } from '../entity.Models/booking';
import { TokenStorageService } from '../services/token-storage.service';
import { AdditionalEquipmentService } from '../services/additionalEquipment/additional-equipment.service';
import { HirerService } from '../services/user/hirer.service';
import {AuthService} from '../services/auth.service';
import {DialogBoxComponent} from '../dialogs/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';
export interface AE {
  name: string;
  reserve: boolean;
  color: ThemePalette;
}
@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  id:string;
  minDate: Date;
  maxDate:Date;
  drivingLicenseID:any;
  range:FormGroup;
  vehicleBookingDetails:any;
  totalPrice:any=0.0;
  additionalEquipments:any;
  errorMessage: any;


  constructor(public dialogService: MatDialog,private hirer:HirerService ,private route: ActivatedRoute, private additionalEquipmentService:AdditionalEquipmentService,
    private vehicleService:VehicleService, private bookingService:BookingService, private tokenStorage: TokenStorageService,
    private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getDetails();

    this.minDate = new Date();

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });

  }

  ngOnInit(): void {
    this.getDetails();
  }


  setMaxDate(){
    if(this.range.controls.start.value){
      this.maxDate=add(this.range.controls.start.value, {days: 14});
    }
    return this.maxDate;
  }
  getDetails(){
    this.vehicleService.getVehicle(this.id).subscribe(data=>{
      this.vehicleBookingDetails=data;
      console.log(this.vehicleBookingDetails);
    })
    this.additionalEquipmentService.getAllAEquipments().subscribe(data=>{
      this.additionalEquipments=data;
    });
  }

  getVehicleAvailability(start:any, end:any){
    if(start==null && end==null){
      this.errorMessage="Please select a date range";
    }else{
      this.errorMessage=null;
      let s=add(start,{hours: 13, minutes:30});
      let e=add(end,{hours: 13, minutes:30});
      let ss=formatISO9075(s);
      let ee=formatISO9075(e);

      console.log(ss);
      console.log(ee);
      let req={startdate: ss, enddate:ee, id:this.id}

      this.bookingService.getAvailabilityOfVehicle(req).subscribe(data=>{

        this.vehicleBookingDetails.quantity=data.quantity;
        console.log(this.vehicleBookingDetails)
      })
      this.getAvailableAdditionalEquipments(ss, ee);
      this.calculatePrice(s, e, this.vehicleBookingDetails.price);
      console.log(this.totalPrice);
    }


  }

  task: AE []= [{
    name: 'SatNav',
    reserve: false,
    color: 'primary'
  }, {
    name: 'Baby Seats',
    reserve: false,
    color: 'primary'
  },{
    name: 'Indeterminate',
    reserve: false,
    color: 'primary'
  }];

  calculatePrice (bookedDate:any, returnDate:any, vehicleCost:any){
    let totalDays=differenceInCalendarDays(returnDate, bookedDate);
     this.totalPrice= totalDays * vehicleCost;
  }

  getAvailableAdditionalEquipments(start:any, end:any){
    let req={
      startdate:start, enddate:end
    }
    this.bookingService.getAvailableEquipments(req).subscribe(data=>{
      console.log(data);
      data.forEach((element: any) => {
        element['reserve']=false;
      });
      this.additionalEquipments=data;
      console.log(this.additionalEquipments);

    })
  }
  createBooking(start:any, end:any){
    if(this.tokenStorage.isAuthenticated() && JSON.parse(this.tokenStorage.getUser()).role==='hirer'){
      let aes: any[]=[];
      this.additionalEquipments.forEach((element:any)=> {
        if(element.reserve===true){
          aes.push(element.id);
        }
      });
      let booking:Booking=new Booking();
      let email=JSON.parse(this.tokenStorage.getUser()).email;
      let id=JSON.stringify(JSON.parse(this.tokenStorage.getUser()).id);
      this.hirer.checkIfBlacklisted(email).subscribe(data=>{
        console.log(data);
        if(data.blackListed===false){

          console.log(data.blackListed);
          booking.additionalEquipment=aes;
          booking.bookingDate=start;
          booking.hirerId=id;
          booking.returnDate=end;
          booking.status=Status.PENDING;
          booking.totalPrice=this.totalPrice;
          booking.vehicleID=this.id;
          booking.licenseNumber=this.drivingLicenseID;
          console.log(booking);
          this.bookingService.createBooking(booking).subscribe(data=>{
            console.log(data);
            this.router.navigate(['/home']);
          }, err => {
            this.errorMessage = err.error.message;
          })
        }else{
          this.errorMessage="YOU ARE BLACKLISTED";
        }
      }, err => {
        this.errorMessage = err.error.message;
      })
    }
    else{
      const dialogRef = this.dialogService.open(DialogBoxComponent, {
        data: {type: "Message", message: 'Login or Register as a Hirer to continue with the Booking', title: 'Attention'}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/login']);
      });
    }
  }
}
