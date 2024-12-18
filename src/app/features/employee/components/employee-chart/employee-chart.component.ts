import { Component, EventEmitter, OnInit } from '@angular/core';
import { USER_OBJECTS } from '../../../../../assets/mock-data';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrl: './employee-chart.component.scss',
})
export class EmployeeChartComponent implements OnInit {
  data: Employee[] = USER_OBJECTS;
  ngOnInit(): void {}
  navigateToUser(event: EventEmitter<any>): void {
    console.log('navigateToUser : ', event);
  }
}
