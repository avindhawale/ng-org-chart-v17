import { createReducer, on } from '@ngrx/store';
import {
  addEmployee,
  removeEmployee,
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailure,
} from './employee.actions';
import { Employee } from '../../models/employee.model';

export interface EmployeeState {
  employees: Employee[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: EmployeeState = {
  employees: [],
  error: null,
  status: 'pending',
};

export const employeeReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new employee to the employees array
  on(addEmployee, (state, employee) => ({
    ...state,
    employees: [...state.employees, { ...employee, id: Date.now().toString() }],
  })),
  // Remove the employee from the employees array
  on(removeEmployee, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((employee) => employee.id !== id),
  })),
  // Trigger loading the employees
  on(loadEmployees, (state) => ({ ...state, status: 'loading' as const })),
  // Handle successfully loaded employees
  on(loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees: employees,
    error: null,
    status: 'success' as const,
  })),
  // Handle employees load failure
  on(loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  }))
);
