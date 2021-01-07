import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavClerkMenuComponent } from './nav-clerk-menu.component';

describe('NavClerkMenuComponent', () => {
  let component: NavClerkMenuComponent;
  let fixture: ComponentFixture<NavClerkMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavClerkMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavClerkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
