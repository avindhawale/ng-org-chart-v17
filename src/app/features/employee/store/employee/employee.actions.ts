import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

export const addEmployee = createAction(
  '[Employee Page] Add Employee',
  props<Employee>()
);

export const removeEmployee = createAction(
  '[Employee Page] Remove Employee',
  props<{ id: string }>()
);

export const loadEmployees = createAction('[Employee Page] Load Employees');

export const loadEmployeesSuccess = createAction(
  '[Employee API] Employee Load Success',
  props<{ employees: Employee[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employee API] Employee Load Failure',
  props<{ error: string }>()
);
