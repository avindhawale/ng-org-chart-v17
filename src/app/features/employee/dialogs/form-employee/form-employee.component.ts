import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrForm } from '@clr/angular';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import {
  addEmployee,
  searchEmployeeByName,
  updateEmployee,
} from '../../store/employee/employee.actions';
import { UtilService } from '../../../../shared/services/util.service';
import { Observable } from 'rxjs';
import { selectSearchResultId } from '../../store/employee/employee.selectors';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss',
})
export class FormEmployeeComponent {
  // Input to control the visibility of the modal
  @Input()
  modalOpen: boolean = true;

  // Input property to pass employee data for edit or add operation
  @Input()
  empData: any;

  // Input property to determine whether the form is for a new employee or editing an existing one
  @Input({ required: true })
  formTypeNewEmp: boolean = true;

  // Output event to notify parent component of modal state changes
  @Output()
  onModalChangeEvent: EventEmitter<boolean> = new EventEmitter();

  // Injected dependencies
  private store = inject(Store);
  private utilService = inject(UtilService);
  private notificationService = inject(NotificationService);

  // form for employee data
  employeeForm: any;

  // Observable for search results by employee name
  searchResultId$: Observable<string | null>;

  @ViewChild(ClrForm, { static: true }) clrForm: any;

  // List of designations available for selection
  designations = [
    'VP of Engineering',
    'VP of Marketing',
    'Engineering Manager',
    'Marketing Manager',
    'Software Engineer',
    'Marketing Specialist',
    'HR Manager',
    'QA Engineer',
  ];

  constructor() {
    this.searchResultId$ = this.store.select(selectSearchResultId);
  }

  ngOnInit(): void {
    console.log('this.empData : ', this.empData);

    // Initialize the reactive form with validation rules
    this.employeeForm = new FormGroup({
      manager: new FormControl(this.empData.name || '', [Validators.required]),
      parentId: new FormControl(this.empData.name || '', [Validators.required]),
      name: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[- +()0-9]{10,13}'),
      ]),
      id: new FormControl(''),
    });

    // Dispatch an action to search for the manager's ID by name
    this.store.dispatch(searchEmployeeByName({ name: this.empData.name }));

    // If editing an employee, pre-fill the form with existing data
    if (!this.formTypeNewEmp) {
      this.employeeForm.patchValue({
        manager: this.empData.manager,
        name: this.empData.name,
        designation: this.empData.designation,
        email: this.empData.email,
        phone: this.empData.phone,
        id: this.empData.id,
        parentId: this.empData.manager,
      });
    }
  }

  /**
   * Handles changes in the modal's state and emits the updated state to the parent component.
   * @param event - The new state of the modal (true or false).
   */
  onModalChange(event: any): void {
    this.onModalChangeEvent.emit(event);
  }

  /**
   * Handles the add or edit operation for an employee.
   * - Validates the form before submission.
   * - Dispatches appropriate actions for adding or updating employees.
   * - Displays success notifications on completion.
   */
  onAddEditEmployee(): void {
    // Validate the form before proceeding
    if (this.employeeForm.invalid) {
      this.clrForm.markAsTouched(); // Mark form as touched to display validation errors
    } else {
      if (this.employeeForm.get('id').value) {
        // If ID exists, update the employee
        this.store.dispatch(
          updateEmployee({ employee: this.employeeForm.value as Employee })
        );
        this.notificationService.showSuccess('Data is updated successfully');
      } else {
        // If no ID, add a new employee
        this.searchResultId$.subscribe((id) => {
          // Assign the manager ID to the new employee
          this.employeeForm.patchValue({
            manager: id,
            parentId: id,
          });

          // Generate a random ID for the new employee
          this.employeeForm
            .get('id')
            .setValue(this.utilService.randomId() + '');

          // Dispatch the add action with the new employee data
          this.store.dispatch(
            addEmployee({ employee: this.employeeForm.value as Employee })
          );

          // Reset the form after submission
          this.employeeForm.reset();
          this.notificationService.showSuccess(
            'Reportee is added successfully'
          );
        });
      }
      this.modalOpen = false; // Close the modal after submission
    }
  }
}
