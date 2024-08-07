import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '../landing/landing.component';
import { HideOnUrlDirective } from '../../core/directive/hide-on-url.directive';
import { ShowOnUrlDirective } from '../../core/directive/show-on-url.directive';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    HeaderComponent,
    LandingComponent,
    ShowOnUrlDirective,
    HideOnUrlDirective,
    RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  public router = inject(Router)
  public isOnSimulator = false;

  ngOnInit() {
    this.router.events.pipe(
      filter(ev => (ev instanceof NavigationEnd))
    ).subscribe((val) => {
      const currentPage = this.router.url; // Current page route
      this.isOnSimulator = currentPage.includes('simulator');
    });
  }

}
