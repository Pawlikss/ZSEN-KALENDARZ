import { TestBed } from '@angular/core/testing';

import { WyslijEventyService } from './wyslij-eventy.service';

describe('WyslijEventyService', () => {
  let service: WyslijEventyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WyslijEventyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
