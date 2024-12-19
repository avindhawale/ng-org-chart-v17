import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { Employee } from '../../models/employee.model';
import { initialEmployeeState } from './employee.state';

const saveToLocalStorage = (employees: Employee[]) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const employeeReducer = createReducer(
  initialEmployeeState,
  on(EmployeeActions.loadEmployees, (state) => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    return { ...state, employees };
  }),

  on(EmployeeActions.addEmployee, (state, { employee }) => {
    const updatedEmployees = [...state.employees, employee];
    saveToLocalStorage(updatedEmployees);
    return { ...state, employees: updatedEmployees };
  }),

  on(EmployeeActions.updateEmployee, (state, { employee }) => {
    const updatedEmployees = state.employees.map((e) =>
      e.id === employee.id ? { ...e, ...employee } : e
    );
    saveToLocalStorage(updatedEmployees);
    return { ...state, employees: updatedEmployees };
  }),

  // Delete employee logic with reportees reassignment
  on(EmployeeActions.deleteEmployee, (state, { id }) => {
    // Find the employee to delete
    const employeeToDelete = state.employees.find((e) => e.id === id);
    if (!employeeToDelete) return state; // Return unchanged state if employee not found

    // Update reportees to point to the deleted employee's manager
    const updatedEmployees = state.employees.map((e) =>
      e.manager === id
        ? {
            ...e,
            manager: employeeToDelete.manager,
            parentId: employeeToDelete.manager,
          }
        : e
    );

    // Remove the deleted employee
    const finalEmployees = updatedEmployees.filter((e) => e.id !== id);

    saveToLocalStorage(finalEmployees); // Save updated list to localStorage
    return { ...state, employees: finalEmployees };
  }),

  on(EmployeeActions.searchEmployeeByName, (state, { name }) => {
    const foundEmployee = state.employees.find(
      (employee) => employee.name.toLowerCase() === name.toLowerCase()
    );
    return {
      ...state,
      searchResultId: foundEmployee ? foundEmployee.id : null,
    };
  })
);

/* 
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
); */
