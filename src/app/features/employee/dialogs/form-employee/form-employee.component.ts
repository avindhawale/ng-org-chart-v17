import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss',
})
export class FormEmployeeComponent {
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

  onAddEditEmployee(): void {
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
