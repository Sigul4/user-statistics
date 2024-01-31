import { TestBed } from '@angular/core/testing';

import { ReportGraphService } from './user-management.service';

describe('ReportGraphService', () => {
  let service: ReportGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
