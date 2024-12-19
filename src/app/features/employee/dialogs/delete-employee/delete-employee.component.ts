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

  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);

  onModalChange(event: any): void {
    this.onModalChangeEvent.emit(event);
  }

  onRemoveEmployee(): void {
    this.employeeService.deleteEmployee(this.empData.id).subscribe({
      next: (res) => {
        this.modalOpen = false;
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
  }
}
