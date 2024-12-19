import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { EmployeeService } from '../../services/employee.service';
import { USER_OBJECTS } from '../../../../../assets/mock-data';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss',
})
export class UpdateEmployeeComponent implements OnInit {
  @Input()
  modalOpen: boolean = true;
  vertical = '';
  items = [
    'Alice Johnson',
    'Bob Smith',
    'Diana Prince',
    'Charlie Brown',
    'Frank Castle',
    'Henry Adams',
  ];

  @Input()
  empData: any;

  @Output()
  onModalChangeEvent: EventEmitter<boolean> = new EventEmitter();

  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {}
  onModalChange(event: any): void {
    this.onModalChangeEvent.emit(event);
  }

  onUpdateEmployee(): void {
    console.log('vertical : ', this.vertical);

    this.employeeService.updateEmployee(this.empData.id).subscribe({
      next: (res) => {
        this.modalOpen = false;
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
  }
}
