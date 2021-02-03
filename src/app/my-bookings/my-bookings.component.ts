import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {formatISO, parseISO} from 'date-fns';
import {Observable} from 'rxjs';
import {ExtendReturnDateDialogComponent} from '../dialogs/extend-return-date-dialog/extend-return-date-dialog.component';
import {Status} from '../entity.Models/booking';
import {BookingService} from '../services/booking/booking.service';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {

  myBookings:any=[];
  id:any;
  error:boolean=false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    obs: Observable<any>;
    dataSource: MatTableDataSource<any>;
    selectedStatus:any;
    status:Status[]=[Status.CANCELLED, Status.BOOKED,Status.PENDING, Status.EXTENDED, Status.COMPLETED, Status.PICKED];
  constructor(private router: Router,private dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef, private tokenService:TokenStorageService, private bookingService:BookingService) {
    this.id= JSON.parse(this.tokenService.getUser()).id;
    this.selectedStatus = new FormControl(this.status);

  }

  ngAfterViewInit():void{
    this.getUserBookings();

  }
  ngOnInit(): void {
  }

  getUserBookings(){
    this.bookingService.findAllBookingsOfUser(this.id).subscribe(data=>{
      data.forEach((element:any) => {
        element.bookingDate= formatISO(parseISO(element.bookingDate), { representation: 'date' });
        element.returnDate=  formatISO(parseISO(element.returnDate), { representation: 'date' });
        element["extendError"]=false;
      });
      this.myBookings=data;
      this.setPaginationData(this.myBookings);

    })
  }

  setPaginationData(bookings:any){
    this.dataSource= new MatTableDataSource<any>(bookings);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  filterBookings(){
      this.dataSource.filter = this.selectedStatus.value.trim().toLocaleLowerCase();
    }


    extendReturnDate(min:any,id:any, status:Status){
      let bookingAvailable=this.checkIfBookingAlreadyAvailable(min);
      if(status===Status.PICKED && (bookingAvailable===false)){
        let dialogRef = this.dialog.open(ExtendReturnDateDialogComponent, {
          width: '400px',
          data: { min: min}
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          if(result){
              this.bookingService.extendReturnDate(id, result).subscribe(data=>{
              console.log(data);
              this.router.navigate(['/my-bookings']).then(() => {
                window.location.reload();
              });;
            });
          }

        });
      }else if(status!=Status.PICKED && (bookingAvailable===false)){
        const index = this.myBookings.map((booking: { id: any; }) => booking.id).indexOf(id);
        console.log(index)
        this.myBookings[index].extendError=true;
      }else{
        const index = this.myBookings.map((booking: { id: any; }) => booking.id).indexOf(id);
        console.log(index)
        this.myBookings[index].extendError=true;
      }
  }

  checkIfBookingAlreadyAvailable(date:any):boolean{
    this.bookingService.checkForBookingAvailability(date).subscribe(data=>{
      if (Array.isArray(data) && data.length > 0) {
        return true;
      }
      return false;
    })
    return false;
  }

  }

