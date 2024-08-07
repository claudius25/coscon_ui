import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/pipe/translate.pipe';
import { ButtonComponent } from '../../core/component/button/button.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgOptimizedImage,
    ButtonComponent,
    RouterLink, TranslatePipe, UpperCasePipe],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {

  t1;
  landingItems = [
    {
      id: 'item1',
      imgSrc: './assets/images/alleys.avif',
      title: 'ALEI & PAVELE',
      navUrl: './simulator/alley',
    },
    {
      id: 'item2',
      imgSrc: './assets/images/fences.avif',
      title: 'GARDURI',
      navUrl: './simulator/fence',
    },
  ]
  constructor(public router: Router) {
  }

  checkWidth() {
    this.adjustElement('motto-e')
    this.adjustElement('motto-1')
    this.adjustElement('motto-3')
  }

  private adjustElement(elName: string) {
    const parentBlock = document.getElementsByClassName('motto')[0];
    const pw = parentBlock.getBoundingClientRect().width;

    let bottomBlock = document.getElementsByClassName(elName)[0] as HTMLElement;
    const w = bottomBlock.getBoundingClientRect().width;
    const w1 = window.getComputedStyle(bottomBlock);
    if (w <= pw) {
      const fontsizeValue = Number(w1.fontSize.split('px')[0]);
      bottomBlock.style['font-size'] = `${fontsizeValue + 1}px`
    }
    else {
      if (w >= pw + 8) {
        const fontsizeValue = Number(w1.fontSize.split('px')[0]);
        bottomBlock.style['font-size'] = `${fontsizeValue - 1}px`
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    clearInterval(this.t1);
    this.t1 = setInterval(() => {
      this.checkWidth()
    }, 1)
    setTimeout(() => {
      clearInterval(this.t1);
    }, 500)
  }

  ngOnDestroy() {
    clearInterval(this.t1);
  }
  ngOnInit() {
    this.t1 = setInterval(() => {
      this.checkWidth()
    }, 1)

    setTimeout(() => {
      clearInterval(this.t1);
    }, 500)
    return;
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
