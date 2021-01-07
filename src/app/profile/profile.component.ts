import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatISO, parse, parseISO } from 'date-fns';
import { Observable } from 'rxjs';
import { BookingService } from '../services/booking/booking.service';
import { TokenStorageService } from '../services/token-storage.service';
import { HirerService } from '../services/user/hirer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  myProfile:any;
  id:any;
  myBookings:any=[];
  products = [
    { name: "Product A", description: "some description", picture: { url: 'https://dummyimage.com/600x150/000/fff' } },
    { name: "Product B", description: "some description", picture: { url: 'https://dummyimage.com/300x300/000/fff' } },
    { name: "Product C", description: "some description", picture: { url: 'https://dummyimage.com/300x400/000/fff' } },
    { name: "Product C", description: "some description", picture: { url: 'https://dummyimage.com/300x400/000/fff' } },
    { name: "Product C", description: "some description", picture: { url: 'https://dummyimage.com/300x400/000/fff' } },
    { name: "Product D", description: "some description", picture: { url: 'https://dummyimage.com/600x500/000/fff' } }]

  addProduct() {
    this.products.push({ name: Math.random().toString(36).substring(7), description: Math.random().toString(36).substring(50), picture: { url: 'https://dummyimage.com/600x400/000/fff' } })
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private tokenService:TokenStorageService, 
    private hirerService:HirerService, private bookingService:BookingService) {
    this.getUserDetails();
    console.log(this.obs);
    
  }
  

  ngOnInit() {
    this.getUserBookings();
    
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  getUserDetails(){
    this.id= JSON.parse(this.tokenService.getUser()).id;
    this.hirerService.getHirer(this.id).subscribe(data=>{
      this.myProfile=data;
    })
  }

  getUserBookings(){
    this.bookingService.findAllBookingsOfUser(this.id).subscribe(data=>{
      data.forEach((element:any) => {
        element.bookingDate= formatISO(parseISO(element.bookingDate), { representation: 'date' });
        element.returnDate=  formatISO(parseISO(element.returnDate), { representation: 'date' });
      });

      this.myBookings=data;
      this.dataSource= new MatTableDataSource<any>(this.myBookings);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }
}
