import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { EmployeeChartComponent } from './components/employee-chart/employee-chart.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeGridComponent } from './components/employee-grid/employee-grid.component';
import { AddEmployeeComponent } from './dialogs/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './dialogs/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './dialogs/update-employee/update-employee.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FormEmployeeComponent } from './dialogs/form-employee/form-employee.component';

@NgModule({
  declarations: [
    EmployeeGridComponent,
    EmployeeChartComponent,
    DeleteEmployeeComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    EmployeeFormComponent,
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
