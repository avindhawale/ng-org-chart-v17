import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import {
  searchEmployeeByName,
  updateEmployee,
} from '../../store/employee/employee.actions';
import { selectSearchResultId } from '../../store/employee/employee.selectors';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss',
})
export class UpdateEmployeeComponent implements OnInit {
  @Input()
  modalOpen: boolean = true;

  invalidManagerName: boolean = false;

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

  private notificationService = inject(NotificationService);
  private store = inject(Store);

  searchResultId$: Observable<string | null>;

  constructor() {
    this.searchResultId$ = this.store.select(selectSearchResultId);
  }

  ngOnInit(): void {}
  onModalChange(event: any): void {
    this.onModalChangeEvent.emit(event);
  }

  onUpdateEmployee(): void {
    if (this.vertical.length) {
      this.store.dispatch(searchEmployeeByName({ name: this.vertical }));
      this.searchResultId$.subscribe((id) => {
        if (id) {
          this.empData.manager = id;
          this.empData.parentId = id;
          this.store.dispatch(updateEmployee({ employee: this.empData }));
          this.notificationService.showSuccess(
            'Reporting Line is updated successfully'
          );
          this.modalOpen = false;
        } else {
          this.invalidManagerName = true;
        }
      });
    }
  }
}
