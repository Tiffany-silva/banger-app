import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingManagementDashboardComponent } from './booking-management-dashboard.component';

describe('BookingManagementDashboardComponent', () => {
  let component: BookingManagementDashboardComponent;
  let fixture: ComponentFixture<BookingManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingManagementDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
