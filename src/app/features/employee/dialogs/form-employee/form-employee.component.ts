import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrForm } from '@clr/angular';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import {
  addEmployee,
  searchEmployeeByName,
  updateEmployee,
} from '../../store/employee/employee.actions';
import { UtilService } from '../../../../shared/services/util.service';
import { Observable } from 'rxjs';
import { selectSearchResultId } from '../../store/employee/employee.selectors';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss',
})
export class FormEmployeeComponent {
  @Input()
  modalOpen: boolean = true;

  @Input()
  empData: any;

  @Input({ required: true })
  formTypeNewEmp: boolean = true;

  @Output()
  onModalChangeEvent: EventEmitter<boolean> = new EventEmitter();

  private store = inject(Store);
  private utilService = inject(UtilService);
  private notificationService = inject(NotificationService);

  employeeForm: any;
  searchResultId$: Observable<string | null>;

  @ViewChild(ClrForm, { static: true }) clrForm: any;
  designations = [
    'VP of Engineering',
    'VP of Marketing',
    'Engineering Manager',
    'Marketing Manager',
    'Software Engineer',
    'Marketing Specialist',
    'HR Manager',
    'QA Engineer',
  ];

  constructor() {
    this.searchResultId$ = this.store.select(selectSearchResultId);
  }

  ngOnInit(): void {
    console.log('this.empData : ', this.empData);

    this.employeeForm = new FormGroup({
      manager: new FormControl(this.empData.name || '', [Validators.required]),
      parentId: new FormControl(this.empData.name || '', [Validators.required]),
      name: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[- +()0-9]{10,13}'),
      ]),
      id: new FormControl(''),
    });

    this.store.dispatch(searchEmployeeByName({ name: this.empData.name }));
    if (!this.formTypeNewEmp) {
      //edit employee detail
      this.employeeForm.patchValue({
        manager: this.empData.manager,
        name: this.empData.name,
        designation: this.empData.designation,
        email: this.empData.email,
        phone: this.empData.phone,
        id: this.empData.id,
        parentId: this.empData.manager,
      });
    }
  }
  onModalChange(event: any): void {
    this.onModalChangeEvent.emit(event);
  }

  onAddEditEmployee(): void {
    if (this.employeeForm.invalid) {
      this.clrForm.markAsTouched();
    } else {
      if (this.employeeForm.get('id').value) {
        //Edit employee
        this.store.dispatch(
          updateEmployee({ employee: this.employeeForm.value as Employee })
        );

        this.notificationService.showSuccess('Data is updated successfully');
      } else {
        //Add reportee
        this.searchResultId$.subscribe((id) => {
          this.employeeForm.patchValue({
            manager: id,
            parentId: id,
          });

          this.employeeForm
            .get('id')
            .setValue(this.utilService.randomId() + '');
          this.store.dispatch(
            addEmployee({ employee: this.employeeForm.value as Employee })
          );
          this.employeeForm.reset();
          this.notificationService.showSuccess(
            'Reportee is added successfully'
          );
        });
      }
      this.modalOpen = false;
    }
  }
}
