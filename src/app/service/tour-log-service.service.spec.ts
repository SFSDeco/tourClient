import { TestBed } from '@angular/core/testing';

import { TourLogServiceService } from './tour-log-service.service';

describe('TourLogServiceService', () => {
  let service: TourLogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourLogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
