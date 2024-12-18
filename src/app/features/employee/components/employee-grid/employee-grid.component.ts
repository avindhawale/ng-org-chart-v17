import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { USER_OBJECTS } from '../../../../../assets/mock-data';
import { Employee } from '../../models/employee.model';
import { Store } from '@ngrx/store';
import { loadEmployees } from '../../store/employee/employee.actions';
import { selectAllEmployees } from '../../store/employee/employee.selectors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.scss',
})
export class EmployeeGridComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  employees: Employee[] = [];
  public allEmployees$ = this.store.select(selectAllEmployees);
  sub: any;

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());
    this.sub = this.allEmployees$.subscribe((data) => (this.employees = data));
  }

  onEdit(emp: Employee): void {}
  onDelete(emp: Employee): void {}
  onAddReportee(emp: Employee): void {}
  onChangeReportingLine(emp: Employee): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
