import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

export const loadEmployees = createAction('[Employee] Load Employees');

export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
);

export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ employee: Employee }>()
);

export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ id: string }>()
);

export const searchEmployeeByName = createAction(
  '[Employee] Search Employee By Name',
  props<{ name: string }>()
);

export const searchEmployeeByNameSuccess = createAction(
  '[Employee] Search Employee By Name Success',
  props<{ id: string | null }>()
);

export const loadEmployeesSuccess = createAction(
  '[Employee API] Employee Load Success',
  props<{ employees: Employee[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employee API] Employee Load Failure',
  props<{ error: string }>()
);
