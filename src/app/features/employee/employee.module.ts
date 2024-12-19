import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeChartComponent } from './components/employee-chart/employee-chart.component';
import { EmployeeGridComponent } from './components/employee-grid/employee-grid.component';
import { AddEmployeeComponent } from './dialogs/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './dialogs/delete-employee/delete-employee.component';
import { FormEmployeeComponent } from './dialogs/form-employee/form-employee.component';
import { UpdateEmployeeComponent } from './dialogs/update-employee/update-employee.component';

@NgModule({
  declarations: [
    EmployeeGridComponent,
    EmployeeChartComponent,
    DeleteEmployeeComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    FormEmployeeComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClarityModule,
    SharedModule,
    FormsModule,
  ],
})
export class EmployeeModule {}
