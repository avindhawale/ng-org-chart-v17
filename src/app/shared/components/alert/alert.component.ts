import { Component, Input } from '@angular/core';
import { AlertMessage } from '../../services/notification.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input()
  alert: AlertMessage | undefined;
}
