import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { filter } from 'rxjs';
import { TranslateService } from './core/service/translate.service';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  translateService = inject(TranslateService);
  router = inject(Router)
  isOnPrices = false;

  ngOnInit(): void {
    this.translateService.initTranslate(environment.langFile),
      this.router.events.pipe(
        filter(ev => (ev instanceof NavigationEnd))
      ).subscribe((val) => {
        const currentPage = this.router.url; // Current page route
        this.isOnPrices = currentPage.includes('prices');
      });
  }

}
