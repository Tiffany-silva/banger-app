import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementDashboardComponent } from './item-management-dashboard.component';

describe('ItemManagementDashboardComponent', () => {
  let component: ItemManagementDashboardComponent;
  let fixture: ComponentFixture<ItemManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemManagementDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
