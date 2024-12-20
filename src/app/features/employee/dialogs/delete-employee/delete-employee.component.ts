import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { deleteEmployee } from '../../store/employee/employee.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss',
})
export class DeleteEmployeeComponent {
  @Input()
  modalOpen: boolean = true;

  @Input()
  empData: any;

  @Output()
  onModalChangeEvent: EventEmitter<boolean> = new EventEmitter();

  private notificationService = inject(NotificationService);
  private store = inject(Store);

  /**
   * Emits an event to the parent component when the modal's state changes.
   * @param event - Boolean value indicating whether the modal is open or closed.
   */
  onModalChange(event: any): void {
    this.onModalChangeEvent.emit(event);
  }

  /**
   * Handles the removal of an employee.
   * - Dispatches a delete action if the employee has a manager.
   * - Shows a success or warning notification based on condition.
   * - Closes the modal after the action is performed.
   */
  onRemoveEmployee(): void {
    // Check if the employee has a manager
    if (this.empData.manager) {
      // Dispatch delete action to the store with the employee ID
      this.store.dispatch(deleteEmployee({ id: this.empData.id }));

      // Show a success notification after deletion
      this.notificationService.showSuccess('Employee is deleted successfully');
    } else {
      // Show a warning notification if the user doesn't have manager
      this.notificationService.showWarning(
        'You don’t have permission to delete this employee'
      );
    }

    // Close the modal
    this.modalOpen = false;
  }
}
