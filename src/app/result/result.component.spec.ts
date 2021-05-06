import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Roots, RootSolverService } from '../root-solver.service';
import { ResultComponent } from './result.component';

const MockRootSolverService = {
  $roots: new BehaviorSubject<Roots>(null),
  $error: new Subject<string>(),
};

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RootSolverService,
          useValue: MockRootSolverService,
        },
        {
          provide: MatSnackBar,
          useValue: jasmine.createSpyObj('MatSnackBar', ['open']),
        },
      ],
    }).compileComponents();
    matSnackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to $roots', () => {
    let emittedRoots = null;
    component.$roots.subscribe((roots) => {
      emittedRoots = roots;
    });
    MockRootSolverService.$roots.next({ x1: 2, x2: 1 });
    expect(emittedRoots).toBeTruthy();
    expect(emittedRoots.x1).toEqual(2);
    expect(emittedRoots.x2).toEqual(1);
  });

  it('should render two roots', () => {
    MockRootSolverService.$roots.next({ x1: 5, x2: 1 });
    fixture.detectChanges();
    const singleRootP = fixture.nativeElement.querySelector('#single-root');
    const root1P = fixture.nativeElement.querySelector('#root-1');
    const root2P = fixture.nativeElement.querySelector('#root-2');
    expect(singleRootP).toBeFalsy();
    expect(root1P.textContent).toMatch(/5$/);
    expect(root2P.textContent).toMatch(/1$/);
  });

  it('should render single root', () => {
    MockRootSolverService.$roots.next({ x1: 2 });
    fixture.detectChanges();
    const singleRootP = fixture.nativeElement.querySelector('#single-root');
    const root1P = fixture.nativeElement.querySelector('#root-1');
    expect(singleRootP.textContent.trim()).toMatch(/2$/);
    expect(root1P).toBeFalsy();
  });

  it('should render emitted error', () => {
    const errorMsg = 'ERROR';
    MockRootSolverService.$error.next(errorMsg);
    fixture.detectChanges();
    expect(matSnackBarSpy.open).toHaveBeenCalledWith(
      errorMsg,
      '',
      jasmine.any(Object)
    );
  });
});
