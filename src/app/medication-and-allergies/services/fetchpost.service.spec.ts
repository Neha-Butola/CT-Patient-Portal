import { TestBed } from '@angular/core/testing';

import { FetchpostService } from './fetchpost.service';

describe('FetchpostService', () => {
  let service: FetchpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
