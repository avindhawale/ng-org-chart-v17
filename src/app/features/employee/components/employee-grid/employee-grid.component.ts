import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { USER_OBJECTS } from '../../../../../assets/mock-data';
import { Employee } from '../../models/employee.model';
import { Store } from '@ngrx/store';
import { loadEmployees } from '../../store/employee/employee.actions';
import { selectAllEmployees } from '../../store/employee/employee.selectors';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.scss',
})
export class EmployeeGridComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  employees: Employee[] = [];
  public allEmployees$ = this.store.select(selectAllEmployees);
  sub: any;
  openDeleteModal: boolean = false;
  openUpdateModal: boolean = false;
  openAddEditModal: boolean = false;

  addNewReporteeFormType: boolean = true;

  selectedEmployee!: Employee;

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());
    this.sub = this.allEmployees$.subscribe((data) => (this.employees = data));
    this.selectedEmployee = this.employees[0];
  }

  onEdit(emp: Employee): void {
    this.selectedEmployee = emp;
    this.openAddEditModal = true;
    this.addNewReporteeFormType = false;
  }

  onDelete(emp: Employee): void {
    this.selectedEmployee = emp;
    this.openDeleteModal = true;
  }
  onAddReportee(emp: Employee): void {
    this.selectedEmployee = emp;
    this.openAddEditModal = true;
    this.addNewReporteeFormType = true;
  }

  onChangeReportingLine(emp: Employee): void {
    this.selectedEmployee = emp;
    this.openUpdateModal = true;
  }
  onViewChart(emp: Employee): void {
    this.router.navigate(['employee', emp.id]);
  }

  onDeleteModalChangeEvent(event: any): void {
    this.openDeleteModal = event;
  }

  onUpdateModalChangeEvent(event: any): void {
    this.openUpdateModal = event;
  }

  onAddEditModalChangeEvent(event: any): void {
    this.openAddEditModal = event;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
