
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { formatISO, parseISO } from 'date-fns';
import {   Observable } from 'rxjs';
import { AddDialogComponent } from 'src/app/dialogs/user-clerk/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogs/user-clerk/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from 'src/app/dialogs/user-clerk/edit-dialog/edit-dialog.component';
import { Clerk } from 'src/app/entity.Models/clerk';
import { AuthService } from 'src/app/services/auth.service';
import { ClerkService } from 'src/app/services/user/clerk.service';
import { HirerService } from 'src/app/services/user/hirer.service';

@Component({
  selector: 'app-clerk-home',
  templateUrl: './clerk-home.component.html',
  styleUrls: ['./clerk-home.component.scss']
})
export class ClerkHomeComponent implements OnInit {

  displayedColumns = [ 'firstName', 'lastName', 'dob', 'confirmIdentity', 
  'drivingLicense', 'address', 'email', 'blackListed', 'createdAt', 'actions'];

  displayedColumnsClerk = [ 'name', 'email','createdAt', 'actions'];

  index: number;
  id: number;
  @ViewChild('sort') sort: MatSort;
  @ViewChild('sortClerk') sortClerk: MatSort;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorClerk') paginatorClerk: MatPaginator;

    obs: Observable<any>;
    dataSource: MatTableDataSource<any>;
    hirerUsers:any[];
    searchFilter:any;

    obsClerk: Observable<any>;
    dataSourceClerk: MatTableDataSource<any>;
    searchFilterClerk:any;
    clerkUsers:any[];

  constructor(public dialogService: MatDialog,private router: Router,
    public dataService: HirerService, private changeDetectorRef: ChangeDetectorRef,
    private changeDetectorRefClerk: ChangeDetectorRef, private clerkService:ClerkService,
    private authService:AuthService) {

  }



  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit():void{
    
  }
  getUsers(){
    this.dataService.getAllHirers().subscribe(data=>{
      data.forEach((element:any) => {
        element.createdAt= formatISO(parseISO(element.createdAt), { representation: 'date' });
      });
      this.hirerUsers=data;
      this.setPaginationData(this.hirerUsers);
    })

    this.clerkService.getAllClerks().subscribe(data=>{
      data.forEach((element:any) => {
        element.createdAt= formatISO(parseISO(element.createdAt), { representation: 'date' });
      });
      this.clerkUsers=data;
      this.setPaginationClerkData(this.clerkUsers);
    })
  }

  setPaginationData(hirerUsers:any){
    this.dataSource= new MatTableDataSource<any>(hirerUsers);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
  }
  setPaginationClerkData(clerkUsers:any){
    this.dataSourceClerk= new MatTableDataSource<any>(clerkUsers);
    this.changeDetectorRefClerk.detectChanges();
    this.dataSourceClerk.paginator = this.paginatorClerk;
    this.dataSourceClerk.sort = this.sortClerk;
    this.obsClerk = this.dataSourceClerk.connect();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterClerk(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClerk.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceClerk.paginator) {
      this.dataSourceClerk.paginator.firstPage();
    }
  }
  openAddDialog() {
    let clerk=new Clerk();
    console.log(clerk)
    const dialogRef = this.dialogService.open(AddDialogComponent, {
      data: {clerk: clerk }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result.clerk) {
        this.authService.registerClerk(result.clerk).subscribe(data=>{
          this.router.navigate(['/clerk-home']).then(() => {
            window.location.reload();
          });
        })   
      }
    });
  }

  startEdit( id: number, blackListed: boolean) {

    console.log(this.index);
    const dialogRef = this.dialogService.open(EditDialogComponent, {
      data: {id: id, blackListed: blackListed, entity: "hirer"}
    });

    dialogRef.afterClosed().subscribe(result => {
  
      console.log('The dialog was closed');
          console.log(result);
            let status={blackListed: result}
              this.dataService.blackListUser(id, status).subscribe(data=>{
              console.log(data);
              this.router.navigate(['/clerk-home']).then(() => {
                window.location.reload();
              });
            });
      });
  }

  deleteItem( id: number, firstName: string, lastName: string, email: string) {
  
    const dialogRef = this.dialogService.open(DeleteDialogComponent, {
      width: '400px',
      data: {id:id,firstName: firstName, email: email, lastName: lastName, user:"hirer"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.deleteHirer(id).subscribe(data=>{
          console.log(data);
          this.router.navigate(['/clerk-home']).then(() => {
            window.location.reload();
          });
        });
        
      }
    });
  }
  deleteClerk( id: number, name: string, email: string) {
  
    const dialogRef = this.dialogService.open(DeleteDialogComponent, {
      width: '400px',
      data: {id:id,name: name, email: email, user: "clerk"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.deleteHirer(id).subscribe(data=>{
          console.log(data);
          this.router.navigate(['/clerk-home']).then(() => {
            window.location.reload();
          });
        });
        
      }
    });
  }

}
