import { TestBed } from '@angular/core/testing';

import { HirerService } from './hirer.service';

describe('HirerService', () => {
  let service: HirerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HirerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
