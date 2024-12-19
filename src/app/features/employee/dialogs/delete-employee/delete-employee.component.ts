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

  onModalChange(event: any): void {
    this.onModalChangeEvent.emit(event);
  }

  onRemoveEmployee(): void {
    if (this.empData.manager) {
      this.store.dispatch(deleteEmployee({ id: this.empData.id }));
      this.notificationService.showSuccess('Employee is deleted successfully');
    } else {
      this.notificationService.showWarning(
        'You dont have permission to delete this employee'
      );
    }
    this.modalOpen = false;
  }
}
