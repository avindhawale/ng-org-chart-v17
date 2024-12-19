import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  darkMode = true;
  onToggle(): void {
    this.darkMode
      ? document
          .getElementsByTagName('body')[0]
          .setAttribute('cds-theme', 'dark')
      : document
          .getElementsByTagName('body')[0]
          .setAttribute('cds-theme', 'light');
  }
}
