import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardSessionGuard } from './guard-session.guard';

describe('guardSessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
