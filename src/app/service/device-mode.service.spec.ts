import { TestBed } from '@angular/core/testing';

import { DeviceModeService } from './device-mode.service';

describe('DeviceModeService', () => {
  let service: DeviceModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
