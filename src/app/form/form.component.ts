import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RootSolverService } from '../root-solver.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  f = new FormGroup({
    a: new FormControl(1, Validators.required),
    b: new FormControl(2, Validators.required),
    c: new FormControl(-8, Validators.required),
  });

  constructor(private rootSolverService: RootSolverService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.f.invalid) {
      this.rootSolverService.$error.next('Fill in all the values.');
      return;
    }
    const { a, b, c } = this.f.value;
    this.rootSolverService.setValues(Number(a), Number(b), Number(c));
  }
}
