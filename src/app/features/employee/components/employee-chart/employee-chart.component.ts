import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import { loadEmployees } from '../../store/employee/employee.actions';
import { selectAllEmployees } from '../../store/employee/employee.selectors';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrl: './employee-chart.component.scss',
})
export class EmployeeChartComponent implements OnInit {
  employees: Employee[] = [];
  actions: string[] = ['add', 'edit', 'delete', 'change', 'detail'];
  empId!: string;
  subRout$: any;

  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);
  private store = inject(Store);
  public allEmployees$ = this.store.select(selectAllEmployees);

  openDeleteModal: boolean = false;
  openUpdateModal: boolean = false;
  openAddEditModal: boolean = false;
  addNewReporteeFormType: boolean = true;
  selectedEmployee!: Employee;

  ngOnInit(): void {
    this.subRout$ = this.activeRouter.paramMap.subscribe((params) => {
      this.empId = params.get('id')!;
      this.employees = [];
      this.store.dispatch(loadEmployees());
      this.allEmployees$.subscribe((data) => {
        this.flattenEmpData(data);
      });
    });
  }

  flattenEmpData(data: any): void {
    this.employees = JSON.parse(JSON.stringify(data));
    if (this.empId) {
      const filterData = data.filter(
        (item: Employee) =>
          item.parentId === this.empId || item.id === this.empId
      );
      this.employees = JSON.parse(JSON.stringify(filterData));
      for (let item of this.employees) {
        if (item.id === this.empId) item.parentId = null;
      }
    }
  }

  navigateToUser(event: any): void {
    console.log('navigateToUser : ', event);

    switch (event.action) {
      case this.actions[0]:
        this.selectedEmployee = event.data;
        this.openAddEditModal = true;
        this.addNewReporteeFormType = true;
        break;
      case this.actions[1]:
        this.selectedEmployee = event.data;
        this.openAddEditModal = true;
        this.addNewReporteeFormType = false;
        break;
      case this.actions[2]:
        this.selectedEmployee = event.data;
        this.openDeleteModal = true;
        break;
      case this.actions[3]:
        this.selectedEmployee = event.data;
        this.openUpdateModal = true;
        break;
      default:
        this.router.navigate(['employee', event.data.id]);
        break;
    }
  }

  onDeleteModalChangeEvent(event: any): void {
    this.openDeleteModal = event;
  }

  onUpdateModalChangeEvent(event: any): void {
    this.openUpdateModal = event;
  }

  onAddEditModalChangeEvent(event: any): void {
    this.openAddEditModal = event;
  }

  ngOnDestroy(): void {
    this.subRout$.unsubscribe();
  }
}
