import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/pipe/translate.pipe';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { ShowOnUrlDirective } from '../../core/directive/show-on-url.directive';
import { ButtonComponent } from '../../core/component/button/button.component';
import { TranslateService } from '../../core/service/translate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,
    ButtonComponent,
    TranslatePipe, UpperCasePipe, AsyncPipe,
    ShowOnUrlDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuExpanded = false;
  showMenuExpandedContent = signal(false);
  translateService = inject(TranslateService);

  constructor(public router: Router) { }

  goHome() {
    this.router.navigate(['./']);
  }

  goTo(url: string) {
    this.router.navigate([url]);
    this.closeMenuDialog();
  }

  openMenuDialog() {
    this.isMenuExpanded = !this.isMenuExpanded;
    if (this.isMenuExpanded === false) {
      this.showMenuExpandedContent.set(false)
    }
    else {
      setTimeout(() => {
        this.showMenuExpandedContent.set(true)
      }, 300)
    }
  }

  closeMenuDialog() {
    this.showMenuExpandedContent.set(false)
    this.isMenuExpanded = false
  }

  logout() {
  }
}
