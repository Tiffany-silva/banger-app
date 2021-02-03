import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { formatISO, parseISO } from 'date-fns';
import { Observable } from 'rxjs';
import { EditDialogComponent } from 'src/app/dialogs/user-clerk/edit-dialog/edit-dialog.component';
import { BookingService } from 'src/app/services/booking/booking.service';
import { HirerService } from 'src/app/services/user/hirer.service';
import {DialogBoxComponent} from '../../dialogs/dialog-box/dialog-box.component';

@Component({
  selector: 'app-booking-management-dashboard',
  templateUrl: './booking-management-dashboard.component.html',
  styleUrls: ['./booking-management-dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class BookingManagementDashboardComponent implements OnInit {

  displayedColumns = [ 'id','bookingStatus', 'bookingDate', 'returnDate', 'totalPrice', 'licenseNumber', 'description','createdAt','actions'];
  expandedElement: any | null;

  index: number;
  id: number;
  @ViewChild('sort') sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

    obs: Observable<any>;
    dataSource: MatTableDataSource<any>;
    bookings:any[];
    searchFilter:any;

  constructor(public dialogService: MatDialog,private router: Router,
    public dataService: BookingService, private changeDetectorRef: ChangeDetectorRef, private hirerService:HirerService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.dataService.getAllBookings().subscribe(data=>{
      console.log(data);
      data.forEach((element:any) => {
        element.bookingDate= formatISO(parseISO(element.bookingDate), { representation: 'date' });
        element.returnDate= formatISO(parseISO(element.returnDate), { representation: 'date' });
        element.createdAt= formatISO(parseISO(element.createdAt), { representation: 'date' });
      });
      this.bookings=data;
      this.setPaginationData(this.bookings);
    })
  }

  setPaginationData(bookings:any){
    this.dataSource= new MatTableDataSource<any>(bookings);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  startEdit( id: number,hirerId:number, blackListed: boolean, bookingStatus:any) {

    const dialogRef = this.dialogService.open(EditDialogComponent, {
      data: {id: id, blackListed: blackListed, bookingStatus:bookingStatus, entity: "booking"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if(result && result.blackListed!=blackListed && result.bookingStatus==bookingStatus){
        let status={blackListed: result.blackListed}
        this.hirerService.blackListUser(hirerId, status).subscribe(data=>{
        this.router.navigate(['/clerk-booking-management']).then(() => {
          window.location.reload();
        });
      });
      }else if(result && result.bookingStatus!=bookingStatus && result.blackListed==blackListed){
        let status={bookingStatus: result.bookingStatus}
        this.dataService.updateBookingStatus(id, status).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/clerk-booking-management']).then(() => {
          window.location.reload();
        });
      });
      }else if(result && result.bookingStatus!=bookingStatus && result.blackListed!=blackListed){
        let status={bookingStatus: result.bookingStatus}
        this.dataService.updateBookingStatus(id, status).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/clerk-booking-management']).then(() => {
          window.location.reload();
        });
      });
      let statusB={blackListed: result.blackListed}
        this.hirerService.blackListUser(hirerId, statusB).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/clerk-booking-management']).then(() => {
          window.location.reload();
        });
      });
      }

      });
    }

  checkWithDMV(id:any, licenseNumber: string,photoURL:string, createdAt:any){
    const dialogRef = this.dialogService.open(DialogBoxComponent, {
      data: {type: "confirm", title: 'Check with DMV'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result===1){
        this.dataService.isUserInDMVList(id, createdAt, photoURL, licenseNumber).subscribe(status => {
          if (status) {
            console.log(status)
            const dialogRef = this.dialogService.open(DialogBoxComponent, {
              data: {type: "Message", message: status.message, title: 'Check with DMV'}
            });

            dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['/clerk-booking-management']).then(() => {
                window.location.reload();
              });
            });
          }
        })
      }
      console.log('The dialog was closed');

    })
  }
  checkForFraudClaims(bookingId:any,identityNumber:any) {
    const dialogRef = this.dialogService.open(DialogBoxComponent, {
      data: {type: "confirm", title: 'Check with Insurance Records for Fraud'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.checkForFraudClaims(identityNumber, bookingId).subscribe(status => {
          if (status) {
            const dialogRef = this.dialogService.open(DialogBoxComponent, {
              data: {type: "Message", message: status.message, title: 'Check with Insurance Records for Fraud'}
            });

            dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['/clerk-booking-management']).then(() => {
                window.location.reload();
              });
            });
          }
        })
      }
      console.log('The dialog was closed');

    })
  }
}
