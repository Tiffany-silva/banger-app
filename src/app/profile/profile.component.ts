import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatISO, parse, parseISO } from 'date-fns';
import { Observable } from 'rxjs';
import { BookingService } from '../services/booking/booking.service';
import { TokenStorageService } from '../services/token-storage.service';
import { HirerService } from '../services/user/hirer.service';
import {FileService} from '../services/file.service';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  myProfile: any;
  email: any;
  myBookings: any = [];
  proof: any;
  drivingLicense: any;
  errorMessage:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;

  constructor(private authService: AuthService,private router: Router, private changeDetectorRef: ChangeDetectorRef, private tokenService: TokenStorageService,
              private hirerService: HirerService, private bookingService: BookingService, private fileService: FileService) {
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

  getUserDetails() {
    this.email = JSON.parse(this.tokenService.getUser()).email;
    this.hirerService.getHirerByEmail(this.email).subscribe(data => {
      this.myProfile = data;
    })
  }

  getUserBookings() {
    this.bookingService.findAllBookingsOfUser(this.email).subscribe(data => {
      data.forEach((element: any) => {
        element.bookingDate = formatISO(parseISO(element.bookingDate), {representation: 'date'});
        element.returnDate = formatISO(parseISO(element.returnDate), {representation: 'date'});
      });

      this.myBookings = data;
      this.dataSource = new MatTableDataSource<any>(this.myBookings);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }

  selectDL(event: any) {
    this.drivingLicense = event.target.files;
  }

  selectProof(event: any) {
    this.proof = event.target.files;
  }

  confirmIdentity() {
    this.authService.uploadImageAndGetURL(this.drivingLicense).subscribe(dl=> {
      this.authService.uploadImageAndGetURL(this.proof).subscribe(p=> {
        let data ={
          drivingLicenseUrl: this.drivingLicense ? dl : null,
          proofURL: this.proof ? p : null
        }
        this.hirerService.updateConfirmIdentity(this.email, data).subscribe(data => {
            console.log(data);
            this.router.navigate(['/profile']).then(() => {
              window.location.reload();
            })},
          err => {
            this.errorMessage = err.error.message;
          }
        );
      });
    });


  }
}
