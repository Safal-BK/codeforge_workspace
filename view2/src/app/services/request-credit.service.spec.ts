import { TestBed } from '@angular/core/testing';

import { RequestCreditService } from './request-credit.service';

describe('RequestCreditService', () => {
  let service: RequestCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
