import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { formatISO, parseISO } from 'date-fns';
import { Observable } from 'rxjs';
import { AddItemDialogComponent } from '../../dialogs/add-item-dialog/add-item-dialog.component';
import { DeleteItemDialogComponent } from '../../dialogs/delete-item-dialog/delete-item-dialog.component';
import { EditItemDialogComponent } from '../../dialogs/edit-item-dialog/edit-item-dialog.component';
import { AdditionalEquipment } from '../../entity.Models/additionalEquipment';
import { Vehicle } from '../../entity.Models/vehicle';
import { AdditionalEquipmentService } from '../../services/additionalEquipment/additional-equipment.service';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-item-management-dashboard',
  templateUrl: './item-management-dashboard.component.html',
  styleUrls: ['./item-management-dashboard.component.scss']
})
export class ItemManagementDashboardComponent implements OnInit {

  displayedColumns = [ 'vehicleName', 'vehicleType', 'quantity', 'price', 'imageURL', 'createdAt', 'actions'];

  displayedColumnsAE = [ 'equipmentType', 'quantity','createdAt', 'actions'];

  index: number;
  id: number;
  @ViewChild('sort') sort: MatSort;
  @ViewChild('sortAE') sortAE: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorAE') paginatorAE: MatPaginator;

    obs: Observable<any>;
    dataSource: MatTableDataSource<any>;
    vehicles:any[];
    searchFilter:any;


    obsAE: Observable<any>;
    dataSourceAE: MatTableDataSource<any>;
    searchFilterAE:any;
    AElist:any[];

  constructor(public dialogService: MatDialog,private router: Router,
    public dataService: VehicleService, private changeDetectorRef: ChangeDetectorRef,
    private changeDetectorRefAE: ChangeDetectorRef, private aeService:AdditionalEquipmentService,private authService: AuthService) {

  }



  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit():void{

  }
  getData(){
    this.dataService.getAllVehicles().subscribe(data=>{
      data.forEach((element:any) => {
        element.createdAt= formatISO(parseISO(element.createdAt), { representation: 'date' });
      });
      this.vehicles=data;
      this.setPaginationData(this.vehicles);
    })

    this.aeService.getAllAEquipments().subscribe(data=>{
      data.forEach((element:any) => {
        element.createdAt= formatISO(parseISO(element.createdAt), { representation: 'date' });
      });
      this.AElist=data;
      this.setPaginationAEData(this.AElist);
    })
  }

  setPaginationData(vehicles:any){
    this.dataSource= new MatTableDataSource<any>(vehicles);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
  }
  setPaginationAEData(aeList:any){
    this.dataSourceAE= new MatTableDataSource<any>(aeList);
    this.changeDetectorRefAE.detectChanges();
    this.dataSourceAE.paginator = this.paginatorAE;
    this.dataSourceAE.sort = this.sortAE;
    this.obsAE = this.dataSourceAE.connect();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterAE(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAE.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAE.paginator) {
      this.dataSourceAE.paginator.firstPage();
    }
  }
  openAddDialog() {
    let vehicle=new Vehicle();
    console.log(vehicle)
    const dialogRef = this.dialogService.open(AddItemDialogComponent, {
      data: {vehicle:vehicle, item:"vehicle"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.authService.uploadImageAndGetURL(result.vehicle.imageURL).subscribe(url=>{
          result.vehicle.imageURL=url;
          this.dataService.createVehicle(result.vehicle).subscribe(data=>{
            this.router.navigate(['/clerk-item-management']).then(() => {
              window.location.reload();
            });
          })
        })
      }
    });
  }
  openAddDialogAE(){
    let aEquipment=new AdditionalEquipment();
    console.log(aEquipment);
    const dialogRef = this.dialogService.open(AddItemDialogComponent, {
      data: {aEquipment:aEquipment, item:"aEquipment"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result.aEquipment) {
        this.aeService.createAEquipment(result.aEquipment).subscribe(data=>{
          this.router.navigate(['/clerk-item-management']).then(() => {
            window.location.reload();
          });
        })
      }
    });
  }
  startEditVehicle( id: number, quantity: number, price: number) {

    console.log(this.index);
    const dialogRef = this.dialogService.open(EditItemDialogComponent, {
      data: {id: id, quantity: quantity, price:price, type:"vehicle"}
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
          console.log(result);
          if(result.price !=price && result.quantity==quantity){

            this.dataService.updatePrice(id, result.price).subscribe(data=>{
              console.log(data);
              this.router.navigate(['/clerk-item-management']).then(() => {
                window.location.reload();
              });
            });
          }else if(result.quantity!=quantity && result.price ==price){
            this.dataService.updateQuantity(id, result.quantity).subscribe(data=>{
              console.log(data);
              this.router.navigate(['/clerk-item-management']).then(() => {
                window.location.reload();
              });
            });
          }else if(result.price !=price && result.quantity!=quantity){
            this.dataService.updateQuantity(id, result.quantity).subscribe(data=>{
              console.log(data);
              this.router.navigate(['/clerk-item-management']).then(() => {
                window.location.reload();
              });
            });
            this.dataService.updatePrice(id, result.price).subscribe(data=>{
              console.log(data);
              this.router.navigate(['/clerk-item-management']).then(() => {
                window.location.reload();
              });
            });
          }

      });
  }
  startEditAE(id:number, quantity:number){
    console.log(this.index);
    const dialogRef = this.dialogService.open(EditItemDialogComponent, {
      data: {id: id, quantity: quantity, type:"aEquipment"}
    });

    dialogRef.afterClosed().subscribe(result => {



    });

  }


  deleteItem( id: number, vehicleName: string, vehicleType: string, quantity: number, price:number) {

    const dialogRef = this.dialogService.open(DeleteItemDialogComponent, {
      width: '400px',
      data: {id:id,vehicleName: vehicleName, vehicleType: vehicleType, quantity: quantity, price:price, item:"vehicle"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.deleteVehicle(id).subscribe(data=>{
          console.log(data);
          this.router.navigate(['/clerk-item-management']).then(() => {
            window.location.reload();
          });
        });

      }
    });
  }
  deleteAequipment( id: number, aeType: string, quantity: number) {

    const dialogRef = this.dialogService.open(DeleteItemDialogComponent, {
      width: '400px',
      data: {id:id, aeType: aeType, quantity: quantity, item: "aEquipment"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.aeService.deleteAEquipment(id).subscribe(data=>{
          console.log(data);
          this.router.navigate(['/clerk-item-management']).then(() => {
            window.location.reload();
          });
       });

      }
    });
  }
}
