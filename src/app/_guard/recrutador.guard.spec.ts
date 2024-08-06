import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { recrutadorGuard } from './recrutador.guard';

describe('recrutadorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => recrutadorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
