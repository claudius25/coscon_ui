import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from '@angular/router';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hideOnUrl]',
  standalone: true
})
export class HideOnUrlDirective {
  private currentRouteName = '';
  private showContainer = true;
  private filterUrls: string[] = [];
  private isComponentCreated = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {
    router.events.subscribe((event: RouterEvent | any): void => {
      // if the route carries a data object with unique routeName value, we filter
      // with higher priority based on that value
      const routeName = this.getRouteName(event?.snapshot);
      // console.log("event ", event)
      if (routeName) {
        this.currentRouteName = routeName;
      }
      if (this.currentRouteName) {
        // csa: save this.currentRouteName so it can be available in the set hideOnUrl, where normally it isn't
        this.route.snapshot.data = { currentRouteName: this.currentRouteName };
        this.checkUrls(this.currentRouteName);
      }
      // at the very end of navigation events we decide weather to create or not the template
      // to prevent visual glitching
      if (event instanceof NavigationEnd) {
        this.createTemplate();
      }
    });
  }

  getRouteName(root: any): string | undefined {
    if (root?.firstChild) {
      return this.getRouteName(root.firstChild);
    }
    return root?.data?.routeName;
  }

  private checkUrls(routeName: string) {
    if (routeName) {
      this.showContainer = true;
      this.filterUrls.forEach((url) => {
        if (routeName === url) {
          this.showContainer = false;
        }
      });
    }
  }

  private createTemplate() {
    if (this.showContainer && !this.isComponentCreated) {
      this.isComponentCreated = true;
      this.container.clear();
      this.container.createEmbeddedView(this.template);
    } else if (!this.showContainer && this.isComponentCreated) {
      this.isComponentCreated = false;
      this.container.clear();
    }
  }

  @Input()
  set hideOnUrl(url: string | string[]) {
    if (typeof url === 'string') {
      this.filterUrls = [url];
    } else if (Array.isArray(url)) {
      this.filterUrls = url;
    }
    if (this.route.snapshot.data['currentRouteName']) {
      this.checkUrls(this.route.snapshot.data['currentRouteName']);
      this.createTemplate();
    }
  }
}
