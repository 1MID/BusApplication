import { TestBed } from '@angular/core/testing';

import { QueryInterBusService } from './query-inter-bus.service';

describe('QueryInterBusService', () => {
  let service: QueryInterBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryInterBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
