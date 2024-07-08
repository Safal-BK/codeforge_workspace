import { TestBed } from '@angular/core/testing';

import { CodexserviceService } from './codexservice.service';

describe('CodexserviceService', () => {
  let service: CodexserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodexserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
