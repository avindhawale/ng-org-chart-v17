import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AlertComponent } from './components/alert/alert.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { OrgChartDirective } from './directives/org-chart.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    OrgChartDirective,
    AlertComponent,
  ],
  imports: [CommonModule, BrowserAnimationsModule, ClarityModule, FormsModule],
  exports: [HeaderComponent, NavComponent, OrgChartDirective, AlertComponent],
})
export class SharedModule {}
