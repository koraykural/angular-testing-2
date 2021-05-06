import { TestBed, tick } from '@angular/core/testing';

import { RootSolverService } from './root-solver.service';

describe('RootSolverService', () => {
  let service: RootSolverService;
  let emittedRoots = null;
  let emittedError = null;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootSolverService);
    emittedError = null;
    emittedRoots = null;
    service.$roots.subscribe((roots) => {
      emittedRoots = roots;
    });
    service.$error.subscribe((error) => {
      emittedError = error;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate two roots 1', () => {
    service.setValues(1, 2, -8);
    expect(emittedRoots.x1).toEqual(2);
    expect(emittedRoots.x2).toEqual(-4);
    expect(emittedError).toBeFalsy();
  });

  it('should calculate two roots 2', () => {
    service.setValues(4, 0, -16);
    expect(emittedRoots.x1).toEqual(2);
    expect(emittedRoots.x2).toEqual(-2);
    expect(emittedError).toBeFalsy();
  });

  it('should calculate single root', () => {
    service.setValues(2, 4, 2);
    expect(emittedRoots.x1).toEqual(-1);
    expect(emittedRoots.x2).toBeUndefined();
    expect(emittedError).toBeFalsy();
  });

  it('should give error for non-quadratic equations', () => {
    service.setValues(0, 2, 2);
    expect(emittedRoots).toBeFalsy();
    expect(emittedError).toEqual('Equation must be second degree.');
  });

  it('should give error for NAN parameters', () => {
    service.setValues(0, undefined as number, 2);
    expect(emittedRoots).toBeFalsy();
    expect(emittedError).toEqual('Values must be numbers.');
  });

  it('should give error for complex roots', () => {
    service.setValues(4, 6, 4);
    expect(emittedRoots).toBeFalsy();
    expect(emittedError).toEqual('Equation has complex roots.');
  });
});
