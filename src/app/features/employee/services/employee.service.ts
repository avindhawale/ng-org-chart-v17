import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';
import { USER_OBJECTS } from '../../../../assets/mock-data';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return of(USER_OBJECTS);
  }

  saveEmployees(employees: Employee[]): Observable<Employee> {
    return of({} as Employee);
  }
}
