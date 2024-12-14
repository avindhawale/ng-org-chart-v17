import { Component, OnInit } from '@angular/core';
import { USER_OBJECTS } from '../../../../../assets/mock-data';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.scss',
})
export class EmployeeGridComponent implements OnInit {
  emp_data = USER_OBJECTS;
  ngOnInit(): void {
    console.log('Data : ', this.emp_data);
  }

  onEdit(emp: Employee): void {}
  onDelete(emp: Employee): void {}
  onAddReportee(emp: Employee): void {}
  onChangeReportingLine(emp: Employee): void {}
}
