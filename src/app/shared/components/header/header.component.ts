import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  darkMode = true;
  onToggle(): void {
    // Toggle the theme based on the current value of darkMode
    this.darkMode
      ? document.body.setAttribute('cds-theme', 'dark')
      : document.body.setAttribute('cds-theme', 'light');
  }
}
