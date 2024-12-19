import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const notificationService = this.injector.get(NotificationService);

    // Check if the error is an HTTP Error
    if (error instanceof HttpErrorResponse) {
      // Handle HTTP Errors
      console.error('HTTP Error:', error.message);
      notificationService.showError(`HTTP Error: ${error.message}`);
    } else if (error instanceof TypeError) {
      // Handle Type Errors
      console.error('Type Error:', error.message);
      notificationService.showError(`Type Error: ${error.message}`);
    } else if (error instanceof Error) {
      // Handle Generic JavaScript Errors
      console.error('Error:', error.message);
      notificationService.showError(`Error: ${error.message}`);
    } else {
      // Handle Unknown Errors
      console.error('Unknown Error:', error);
      notificationService.showError('An unknown error occurred!');
    }
  }
}
