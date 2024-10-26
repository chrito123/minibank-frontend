import { TestBed } from '@angular/core/testing';

import { CustomerEventService} from './customer-event.service.service';

describe('CustomerEventServiceService', () => {
  let service: CustomerEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
