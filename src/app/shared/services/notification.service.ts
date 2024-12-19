import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface AlertMessage {
  type: 'success' | 'danger' | 'info' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private alertSubject = new Subject<AlertMessage>();

  alert: AlertMessage = {
    message: '',
    type: 'info',
  };

  // Observable for alerts
  getAlertMessages(): Observable<AlertMessage> {
    return this.alertSubject.asObservable();
  }

  // Show a alert message
  showAlert(): void {
    this.alertSubject.next(this.alert);
  }

  showError(message: string): void {
    this.alert.message = message;
    this.alert.type = 'danger';
    this.showAlert();
  }

  showSuccess(message: string): void {
    this.alert.message = message;
    this.alert.type = 'success';
    this.showAlert();
  }

  showInfo(message: string): void {
    this.alert.message = message;
    this.alert.type = 'info';
    this.showAlert();
  }

  showWarning(message: string): void {
    this.alert.message = message;
    this.alert.type = 'warning';
    this.showAlert();
  }
}
