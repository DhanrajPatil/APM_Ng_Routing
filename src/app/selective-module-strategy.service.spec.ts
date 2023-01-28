import { TestBed } from '@angular/core/testing';

import { SelectiveModuleStrategyService } from './selective-module-strategy.service';

describe('SelectiveModuleStrategyService', () => {
  let service: SelectiveModuleStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectiveModuleStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
