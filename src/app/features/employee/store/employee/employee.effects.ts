import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addEmployee,
  removeEmployee,
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailure,
} from './employee.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { EmployeeService } from '../../services/employee.service';
import { selectAllEmployees } from './employee.selectors';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private employeeService: EmployeeService
  ) {}

  // Run this code when a loadEmployees action is dispatched
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      switchMap(() =>
        // Call the getEmployees method, convert it to an observable
        from(this.employeeService.getEmployees()).pipe(
          // Take the returned value and return a new success action containing the employees
          map((employees) => loadEmployeesSuccess({ employees: employees })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadEmployeesFailure({ error })))
        )
      )
    )
  );

  // Run this code when the addEmployee or removeEmployee action is dispatched
  saveEmployees$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addEmployee, removeEmployee),
        withLatestFrom(this.store.select(selectAllEmployees)),
        switchMap(([action, employees]) =>
          from(this.employeeService.saveEmployees(employees))
        )
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
