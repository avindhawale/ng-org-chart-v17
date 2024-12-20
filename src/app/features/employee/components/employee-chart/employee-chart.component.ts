import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import { loadEmployees } from '../../store/employee/employee.actions';
import { selectAllEmployees } from '../../store/employee/employee.selectors';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrl: './employee-chart.component.scss',
})
export class EmployeeChartComponent implements OnInit, OnDestroy {
  // List of employees to display
  employees: Employee[] = [];

  // Available actions for employee interactions
  actions: string[] = ['add', 'edit', 'delete', 'change', 'detail'];

  // Currently selected employee ID (retrieved from route params)
  empId!: string;

  // Subscription object for route parameter changes
  subRout$: any;

  // Injected dependencies
  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);
  private store = inject(Store);

  // Observable for all employees from the store
  public allEmployees$ = this.store.select(selectAllEmployees);

  // Flags to manage modal states
  openDeleteModal: boolean = false;
  openUpdateModal: boolean = false;
  openAddEditModal: boolean = false;

  // Flag to toggle between adding a new reportee or editing an employee
  addNewReporteeFormType: boolean = true;

  // Currently selected employee object for operations
  selectedEmployee!: Employee;

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.subRout$ = this.activeRouter.paramMap.subscribe((params) => {
      this.empId = params.get('id')!; // Get the 'id' parameter from the route
      this.employees = []; // Reset the employee list

      // Dispatch an action to load employees into the store
      this.store.dispatch(loadEmployees());

      // Subscribe to employee data and flatten it for display
      this.allEmployees$.subscribe((data) => {
        this.flattenEmpData(data);
      });
    });
  }

  /**
   * Flattens and filters the employee data based on the selected employee ID.
   * @param data - The list of employees from the store
   */
  flattenEmpData(data: any): void {
    this.employees = JSON.parse(JSON.stringify(data)); // Deep clone the data

    // Filter employees based on the selected employee ID
    if (this.empId) {
      const filterData = data.filter(
        (item: Employee) =>
          item.parentId === this.empId || item.id === this.empId
      );
      this.employees = JSON.parse(JSON.stringify(filterData));

      // Set the parentId of the selected employee to null for display purposes
      for (let item of this.employees) {
        if (item.id === this.empId) item.parentId = null;
      }
    }
  }

  /**
   * Handles user actions on employees and performs navigation or opens modals.
   * @param event - Object containing the action type and associated data
   */
  navigateToUser(event: any): void {
    switch (event.action) {
      case this.actions[0]: // Add new employee
        this.selectedEmployee = event.data;
        this.openAddEditModal = true;
        this.addNewReporteeFormType = true;
        break;
      case this.actions[1]: // Edit existing employee
        this.selectedEmployee = event.data;
        this.openAddEditModal = true;
        this.addNewReporteeFormType = false;
        break;
      case this.actions[2]: // Delete employee
        this.selectedEmployee = event.data;
        this.openDeleteModal = true;
        break;
      case this.actions[3]: // Update employee details
        this.selectedEmployee = event.data;
        this.openUpdateModal = true;
        break;
      default: // Navigate to employee details page
        this.router.navigate(['employee', event.data.id]);
        break;
    }
  }

  /**
   * Toggles the delete modal visibility.
   * @param event - Boolean value indicating modal state
   */
  onDeleteModalChangeEvent(event: any): void {
    this.openDeleteModal = event;
  }

  /**
   * Toggles the update modal visibility.
   * @param event - Boolean value indicating modal state
   */
  onUpdateModalChangeEvent(event: any): void {
    this.openUpdateModal = event;
  }

  /**
   * Toggles the add/edit modal visibility.
   * @param event - Boolean value indicating modal state
   */
  onAddEditModalChangeEvent(event: any): void {
    this.openAddEditModal = event;
  }

  ngOnDestroy(): void {
    // Unsubscribe from the route parameter subscription to avoid memory leaks
    this.subRout$.unsubscribe();
  }
}
