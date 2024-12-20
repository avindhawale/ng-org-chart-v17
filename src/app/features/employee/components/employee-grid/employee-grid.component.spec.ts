import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGridComponent } from './employee-grid.component';

describe('EmployeeGridComponent', () => {
  let component: EmployeeGridComponent;
  let fixture: ComponentFixture<EmployeeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
