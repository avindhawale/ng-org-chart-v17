import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import {
  searchEmployeeByName,
  updateEmployee,
} from '../../store/employee/employee.actions';
import { selectSearchResultId } from '../../store/employee/employee.selectors';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss',
})
export class UpdateEmployeeComponent implements OnInit {
  // Input to control the visibility of the modal
  @Input()
  modalOpen: boolean = true;

  // Flag to indicate whether the manager's name is invalid
  invalidManagerName: boolean = false;

  // Holds the name of the new reporting manager
  vertical = '';

  // List of available managers
  items = [
    'Alice Johnson',
    'Bob Smith',
    'Diana Prince',
    'Charlie Brown',
    'Frank Castle',
    'Henry Adams',
  ];

  // Input to receive employee data for updating the reporting line
  @Input()
  empData: any;

  // Output event to notify parent component of modal state changes
  @Output()
  onModalChangeEvent: EventEmitter<boolean> = new EventEmitter();

  // Injected dependencies
  private notificationService = inject(NotificationService);
  private store = inject(Store);

  // Observable to fetch the result of a manager search by name
  searchResultId$: Observable<string | null>;

  constructor() {
    this.searchResultId$ = this.store.select(selectSearchResultId);
  }

  ngOnInit(): void {}

  onModalChange(event: any): void {
    this.onModalChangeEvent.emit(event); // Notify parent about the modal's state change
  }

  /**
   * Handles the update of an employee's reporting line.
   * - Searches for the new manager by name.
   * - Updates the `manager` and `parentId` fields of the employee if the manager is valid.
   * - Displays a success notification or marks the manager name as invalid.
   */
  onUpdateEmployee(): void {
    if (this.vertical.length) {
      // Dispatch an action to search for the manager's ID by name
      this.store.dispatch(searchEmployeeByName({ name: this.vertical }));

      // Subscribe to the search result
      this.searchResultId$.subscribe((id) => {
        if (id) {
          // If a valid manager is found, update the employee's manager and parent ID
          this.empData.manager = id;
          this.empData.parentId = id;

          // Dispatch an action to update the employee in the store
          this.store.dispatch(updateEmployee({ employee: this.empData }));

          // Show success notification
          this.notificationService.showSuccess(
            'Reporting Line is updated successfully'
          );

          // Close the modal
          this.modalOpen = false;
        } else {
          // Mark the manager name as invalid if not found
          this.invalidManagerName = true;
        }
      });
    }
  }
}
