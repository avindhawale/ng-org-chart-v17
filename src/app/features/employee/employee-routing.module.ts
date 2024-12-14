import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeChartComponent } from './components/employee-chart/employee-chart.component';
import { EmployeeGridComponent } from './components/employee-grid/employee-grid.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

const routes: Routes = [
  { path: '', component: EmployeeChartComponent }, // Default route (chart view)
  { path: 'grid', component: EmployeeGridComponent }, // View employee table view
  { path: 'add', component: EmployeeFormComponent }, // Add new reportee
  { path: 'edit/:id', component: EmployeeFormComponent }, // Edit existing reportee
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
