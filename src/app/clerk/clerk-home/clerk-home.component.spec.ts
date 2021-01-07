import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkHomeComponent } from './clerk-home.component';

describe('ClerkHomeComponent', () => {
  let component: ClerkHomeComponent;
  let fixture: ComponentFixture<ClerkHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
