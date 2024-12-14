import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [HeaderComponent, NavComponent],
  imports: [CommonModule, BrowserAnimationsModule, ClarityModule],
  exports: [HeaderComponent, NavComponent],
})
export class SharedModule {}
