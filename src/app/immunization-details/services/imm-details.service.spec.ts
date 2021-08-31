import { TestBed } from '@angular/core/testing';

import { ImmDetailsService } from './imm-details.service';

describe('ImmDetailsService', () => {
  let service: ImmDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
