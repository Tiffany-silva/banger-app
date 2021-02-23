import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparisonsComponent } from './rate-comparisons.component';

describe('RateComparisonsComponent', () => {
  let component: RateComparisonsComponent;
  let fixture: ComponentFixture<RateComparisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateComparisonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateComparisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
