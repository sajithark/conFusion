import { TestBed } from '@angular/core/testing';

import { ProcessHTTPRequestService } from './process-httprequest.service';

describe('ProcessHTTPRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHTTPRequestService = TestBed.get(ProcessHTTPRequestService);
    expect(service).toBeTruthy();
  });
});
