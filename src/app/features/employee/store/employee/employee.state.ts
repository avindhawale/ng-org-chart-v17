import { Employee } from '../../models/employee.model';

export interface EmployeeState {
  employees: Employee[];
  searchResultId: string | null;
}

export const initialEmployeeState: EmployeeState = {
  employees: JSON.parse(localStorage.getItem('employees') || '[]'), // Load initial data from localStorage
  searchResultId: null,
};
