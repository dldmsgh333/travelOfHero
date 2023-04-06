import { TestBed } from '@angular/core/testing';

import { ImMemoryDataService } from './im-memory-data.service';

describe('ImMemoryDataService', () => {
  let service: ImMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
