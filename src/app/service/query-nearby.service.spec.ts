import { TestBed } from '@angular/core/testing';

import { QueryNearbyService } from './query-nearby.service';

describe('QueryNearbyService', () => {
  let service: QueryNearbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryNearbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
