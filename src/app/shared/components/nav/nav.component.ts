import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  router = inject(Router);
  updateView(e: any): void {
    e.target.value === 'grid'
      ? this.router.navigate(['grid'])
      : this.router.navigate(['/']);
  }
}
