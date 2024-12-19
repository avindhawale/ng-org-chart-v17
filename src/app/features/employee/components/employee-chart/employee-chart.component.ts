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
  subData$: any;

  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);
  private store = inject(Store);
  public allEmployees$ = this.store.select(selectAllEmployees);

  ngOnInit(): void {
    this.subRout$ = this.activeRouter.paramMap.subscribe((params) => {
      this.empId = params.get('id')!;
      this.employees = [];
      this.store.dispatch(loadEmployees());
      this.subData$ = this.allEmployees$.subscribe((data) => {
        this.employees = JSON.parse(JSON.stringify(data));
        if (this.empId) {
          const filterData = data.filter(
            (item) => item.parentId === this.empId || item.id === this.empId
          );
          this.employees = JSON.parse(JSON.stringify(filterData));
          for (let item of this.employees) {
            if (item.id === this.empId) item.parentId = null;
          }
        }
      });
    });
  }

  navigateToUser(event: any): void {
    console.log('navigateToUser : ', event);

    switch (event.action) {
      case this.actions[0]:
        break;
      case this.actions[1]:
        break;
      case this.actions[2]:
        break;
      case this.actions[3]:
        break;
      case this.actions[4]:
        this.router.navigate(['employee', event.data.id]);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.subRout$.unsubscribe();
    this.subData$.unsubscribe();
  }
}
