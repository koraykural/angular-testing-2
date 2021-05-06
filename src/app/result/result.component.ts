import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Roots, RootSolverService } from '../root-solver.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  constructor(
    private rootSolverService: RootSolverService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.rootSolverService.$error.subscribe(this.showError.bind(this));
  }

  get $hasTwoRoots(): Observable<boolean> {
    return this.$roots.pipe(map((roots) => roots.x2 != null));
  }

  get $roots(): Observable<Roots> {
    return this.rootSolverService.$roots.pipe(filter((val) => val != null));
  }

  private showError(error: string): void {
    this.snackBar.open(error, '', {
      duration: 3000,
      panelClass: 'error-snackbar',
    });
  }
}
