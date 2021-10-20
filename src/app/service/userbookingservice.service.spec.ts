import { TestBed } from '@angular/core/testing';

import { UserbookingserviceService } from './userbookingservice.service';

describe('UserbookingserviceService', () => {
  let service: UserbookingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserbookingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
