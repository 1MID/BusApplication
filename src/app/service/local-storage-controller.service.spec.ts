import { TestBed } from '@angular/core/testing';

import { LocalStorageControllerService } from './local-storage-controller.service';

describe('LocalStorageControllerService', () => {
  let service: LocalStorageControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
