import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';
import { USER_OBJECTS } from '../../../../assets/mock-data';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getEmployees(): Observable<Employee[]> {
    return of(USER_OBJECTS);
  }

  saveInitialEmployees(): void {
    localStorage.setItem('employees', JSON.stringify(USER_OBJECTS));
  }

  /**
   * For enhancements like API integrations
   */
  deleteEmployee(id: string): Observable<Employee> {
    return of({} as Employee);
  }

  updateEmployee(id: string): Observable<Employee> {
    return of({} as Employee);
  }

  saveEmployees(id: string): Observable<Employee> {
    return of({} as Employee);
  }
}
