import { Component, inject, Input, signal } from '@angular/core';
import { ToasterService } from '../../core/service/toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {

  toasterService = inject(ToasterService);
  @Input() title = signal('')
  @Input() type = signal('')

  ngOnInit() {
    this.toasterService.toaster$.subscribe(val => {
      if (val) {
        this.title.set(val.toaster);
        this.type.set(val.type);
        this.toasterService.closeToaster();
      }
      else {
        this.title.set('');
        this.type.set('');
      }
    })
  }
}
