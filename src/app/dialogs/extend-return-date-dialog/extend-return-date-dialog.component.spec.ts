import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendReturnDateDialogComponent } from './extend-return-date-dialog.component';

describe('ExtendReturnDateDialogComponent', () => {
  let component: ExtendReturnDateDialogComponent;
  let fixture: ComponentFixture<ExtendReturnDateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendReturnDateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendReturnDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
