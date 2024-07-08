import { TestBed } from '@angular/core/testing';

import { CodeforgeserviceService } from './codeforgeservice.service';

describe('CodeforgeserviceService', () => {
  let service: CodeforgeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeforgeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
