import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Roots {
  x1: number;
  x2?: number;
}

@Injectable({
  providedIn: 'root',
})
export class RootSolverService {
  $roots = new BehaviorSubject<Roots | null>(null);
  $error = new Subject<string>();

  constructor() {}

  setValues(a: number, b: number, c: number): void {
    this.$roots.next(null);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      this.$error.next('Values must be numbers.');
      return;
    }
    if (a === 0) {
      this.$error.next('Equation must be second degree.');
      return;
    }
    const discriminant = this.calculateDiscriminant(a, b, c);
    if (discriminant >= 0) {
      this.$roots.next(this.calculateRoot(a, b, discriminant));
    } else {
      this.$error.next('Equation has complex roots.');
    }
  }

  private calculateDiscriminant(a: number, b: number, c: number): number {
    return b * b - 4 * a * c;
  }

  private calculateRoot(a: number, b: number, discriminant: number): Roots {
    if (discriminant > 0) {
      return {
        x1: (-b + Math.sqrt(discriminant)) / (2 * a),
        x2: (-b - Math.sqrt(discriminant)) / (2 * a),
      };
    } else {
      return {
        x1: (-b + Math.sqrt(discriminant)) / (2 * a),
      };
    }
  }
}
