import { TestBed } from '@angular/core/testing';

import { SearchCandidatesService } from './search-candidates.service';

describe('SearchCandidatesService', () => {
  let service: SearchCandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
