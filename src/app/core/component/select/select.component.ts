import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '../../pipe/translate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [TranslatePipe, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() title;
  @Input() target;
  @Input() options;

  @Output() changed = new EventEmitter();

  changeEvent(e) {
    setTimeout(() => {
      this.changed.emit(this.target)
    }, 10)
  }
}
