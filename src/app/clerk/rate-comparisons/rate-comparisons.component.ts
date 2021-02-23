import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {VehicleService} from '../../services/vehicle/vehicle.service';
import {AdditionalEquipmentService} from '../../services/additionalEquipment/additional-equipment.service';
import {AuthService} from '../../services/auth.service';
import {formatISO, parseISO} from 'date-fns';

@Component({
  selector: 'app-rate-comparisons',
  templateUrl: './rate-comparisons.component.html',
  styleUrls: ['./rate-comparisons.component.scss']
})
export class RateComparisonsComponent implements OnInit {

  displayedColumnsCR = [ 'vehicleName', 'ratePerWeek','ratePerMonth', 'excessMileagePerDay'];
  displayedColumns = [ 'vehicleName', 'vehicleType','price'];

  @ViewChild('sort') sort: MatSort;
  @ViewChild('sortCR') sortCR: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorCR') paginatorCR: MatPaginator;

  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;
  vehicles:any[];
  searchFilter:any;

  obsCRates: Observable<any>;
  dataSourceCRates: MatTableDataSource<any>;
  searchFilterComparison:any;
  comparisonRates:any[];

  constructor(public dialogService: MatDialog,private router: Router,
              public dataService: VehicleService, private changeDetectorRef: ChangeDetectorRef,
              private changeDetectorRefCR: ChangeDetectorRef) {

  }



  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit():void{

  }
  getData(){
    this.dataService.getAllVehicles().subscribe(data=>{
      this.vehicles=data;
      this.setPaginationData(this.vehicles);
    })

    this.dataService.getComparisonRates().subscribe(data=>{
      this.comparisonRates=data;
      this.setPaginationCRData(this.comparisonRates);
    })
  }

  setPaginationData(vehicles:any){
    this.dataSource= new MatTableDataSource<any>(vehicles);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
  }
  setPaginationCRData(crList:any){
    this.dataSourceCRates= new MatTableDataSource<any>(crList);
    this.changeDetectorRefCR.detectChanges();
    this.dataSourceCRates.paginator = this.paginatorCR;
    this.dataSourceCRates.sort = this.sortCR;
    this.obsCRates = this.dataSourceCRates.connect();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterCR(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCRates.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCRates.paginator) {
      this.dataSourceCRates.paginator.firstPage();
    }
  }


}
