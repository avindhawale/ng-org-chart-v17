import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import { loadEmployees } from '../../store/employee/employee.actions';
import { selectAllEmployees } from '../../store/employee/employee.selectors';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.scss',
})
export class EmployeeGridComponent implements OnInit, OnDestroy {
  // Injected dependencies
  private store = inject(Store);
  private router = inject(Router);

  // Array to hold the list of employees
  employees: Employee[] = [];

  // Observable for accessing all employees from the store
  public allEmployees$ = this.store.select(selectAllEmployees);

  // Subscription to manage the observable
  sub: any;

  // Flags to control the visibility of modals
  openDeleteModal: boolean = false;
  openUpdateModal: boolean = false;
  openAddEditModal: boolean = false;

  // Determines the type of operation in the add/edit modal (add reportee or edit employee)
  addNewReporteeFormType: boolean = true;

  // Holds the currently selected employee for operations
  selectedEmployee!: Employee;

  ngOnInit(): void {
    this.store.dispatch(loadEmployees()); // Load employees into the store
    this.sub = this.allEmployees$.subscribe((data) => (this.employees = data)); // Populate the employee list
    this.selectedEmployee = this.employees[0]; // Set the default selected employee
  }

  /**
   * Opens the add/edit modal for editing an employee.
   * @param emp - The employee to edit.
   */
  onEdit(emp: Employee): void {
    this.selectedEmployee = emp;
    this.openAddEditModal = true;
    this.addNewReporteeFormType = false; // Indicates an edit operation
  }

  /**
   * Opens the delete modal for deleting an employee.
   * @param emp - The employee to delete.
   */
  onDelete(emp: Employee): void {
    this.selectedEmployee = emp;
    this.openDeleteModal = true;
  }

  /**
   * Opens the add/edit modal for adding a new reportee.
   * @param emp - The employee under whom the new reportee will be added.
   */
  onAddReportee(emp: Employee): void {
    this.selectedEmployee = emp;
    this.openAddEditModal = true;
    this.addNewReporteeFormType = true; // Indicates an add operation
  }

  /**
   * Opens the update modal to change an employee's reporting line.
   * @param emp - The employee whose reporting line will be changed.
   */
  onChangeReportingLine(emp: Employee): void {
    this.selectedEmployee = emp;
    this.openUpdateModal = true;
  }

  /**
   * Navigates to the employee chart view for the selected employee.
   * @param emp - The employee whose chart will be viewed.
   */
  onViewChart(emp: Employee): void {
    this.router.navigate(['employee', emp.id]); // Navigate to the chart view
  }

  /**
   * Updates the delete modal's visibility based on an external event.
   * @param event - Boolean indicating whether the modal should be open or closed.
   */
  onDeleteModalChangeEvent(event: any): void {
    this.openDeleteModal = event;
  }

  /**
   * Updates the update modal's visibility based on an external event.
   * @param event - Boolean indicating whether the modal should be open or closed.
   */
  onUpdateModalChangeEvent(event: any): void {
    this.openUpdateModal = event;
  }

  /**
   * Updates the add/edit modal's visibility based on an external event.
   * @param event - Boolean indicating whether the modal should be open or closed.
   */
  onAddEditModalChangeEvent(event: any): void {
    this.openAddEditModal = event;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
