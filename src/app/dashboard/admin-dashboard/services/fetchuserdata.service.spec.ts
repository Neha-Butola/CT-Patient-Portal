import { TestBed } from '@angular/core/testing';

import { FetchuserdataService } from './fetchuserdata.service';

describe('FetchuserdataService', () => {
  let service: FetchuserdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchuserdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
