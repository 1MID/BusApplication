import { TestBed } from '@angular/core/testing';

import { QueryBusInquireService } from './query-bus-inquire.service';

describe('QueryBusInquireService', () => {
  let service: QueryBusInquireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryBusInquireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
