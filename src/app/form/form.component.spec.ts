import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { RootSolverService } from '../root-solver.service';

import { FormComponent } from './form.component';

const MockRootSolverService = {
  setValues(a: number, b: number, c: number): void {},
  $error: new Subject<string>(),
};

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let inputC: HTMLInputElement;
  let submitBtn: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        {
          provide: RootSolverService,
          useValue: MockRootSolverService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputC = fixture.nativeElement.querySelector('#input-c');
    submitBtn = fixture.nativeElement.querySelector('#submit-btn');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submits with default values', () => {
    spyOn(component, 'onSubmit');
    submitBtn.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('calls setValues of RootSolverService with default values', () => {
    spyOn(MockRootSolverService, 'setValues');
    submitBtn.click();
    expect(MockRootSolverService.setValues).toHaveBeenCalledWith(1, 2, -8);
  });

  it('calls setValues of RootSolverService with new values', () => {
    spyOn(MockRootSolverService, 'setValues');
    component.f.setValue({
      a: 1,
      b: 2,
      c: 0,
    });
    submitBtn.click();
    expect(MockRootSolverService.setValues).toHaveBeenCalledWith(1, 2, 0);
  });

  it('does not submit if form values are missing', () => {
    spyOn(MockRootSolverService, 'setValues');
    component.f.setValue({
      a: 1,
      b: 2,
      c: null,
    });
    submitBtn.click();
    expect(MockRootSolverService.setValues).not.toHaveBeenCalled();
  });

  it('emits error if form values are missing', () => {
    let submittedError = '';
    MockRootSolverService.$error.subscribe((error) => {
      submittedError = error;
    });
    component.f.setValue({
      a: 1,
      b: 2,
      c: null,
    });
    submitBtn.click();
    expect(submittedError).toEqual('Fill in all the values.');
  });
});
