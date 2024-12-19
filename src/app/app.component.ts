import { Component, inject, OnInit } from '@angular/core';
import {
  AlertMessage,
  NotificationService,
} from './shared/services/notification.service';
import { EmployeeService } from './features/employee/services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private employeeService = inject(EmployeeService);

  alert?: AlertMessage;
  ngOnInit(): void {
    //save some initial employee data in localStorage
    this.employeeService.saveInitialEmployees();
    this.notificationService.getAlertMessages().subscribe((alert) => {
      this.alert = alert;
    });
  }
}
