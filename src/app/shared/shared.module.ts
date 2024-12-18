import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { OrgChartDirective } from './directives/org-chart.directive';

@NgModule({
  declarations: [HeaderComponent, NavComponent, OrgChartDirective],
  imports: [CommonModule, BrowserAnimationsModule, ClarityModule],
  exports: [HeaderComponent, NavComponent, OrgChartDirective],
})
export class SharedModule {}
