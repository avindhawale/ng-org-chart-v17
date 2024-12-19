import { Component, inject, OnInit } from '@angular/core';
import {
  AlertMessage,
  NotificationService,
} from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private notificationService = inject(NotificationService);
  alert?: AlertMessage;
  ngOnInit(): void {
    this.notificationService.getAlertMessages().subscribe((alert) => {
      this.alert = alert;
    });
  }
}
