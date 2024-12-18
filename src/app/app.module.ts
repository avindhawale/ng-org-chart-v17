import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeRoutingModule } from './features/employee/employee-routing.module';
import { SharedModule } from './shared/shared.module';
import { employeeReducer } from './features/employee/store/employee/employee.reducer';
import { EmployeeEffects } from './features/employee/store/employee/employee.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    EmployeeRoutingModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ employees: employeeReducer }),
    EffectsModule.forRoot([EmployeeEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
