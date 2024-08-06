import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { candidatoGuard } from './candidato.guard';

describe('candidatoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => candidatoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
