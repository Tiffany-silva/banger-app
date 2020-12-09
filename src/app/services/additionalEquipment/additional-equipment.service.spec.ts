import { TestBed } from '@angular/core/testing';

import { AdditionalEquipmentService } from './additional-equipment.service';

describe('AdditionalEquipmentService', () => {
  let service: AdditionalEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
