import { DimensionToModify } from '../../model/dimension-modify';
import { TranslatePipe } from '../../pipe/translate.pipe';
import { InputIncrementComponent } from '../input-increment/input-increment.component';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';

@Component({
  selector: 'app-dimension-popup',
  standalone: true,
  imports: [InputIncrementComponent, TranslatePipe],
  templateUrl: './dimension-popup.component.html',
  styleUrl: './dimension-popup.component.scss'
})
export class DimensionPopupComponent {

  cd = inject(ChangeDetectorRef);

  @Input() info: DimensionToModify;
  @Output() changed = new EventEmitter()
  @Output() closed = new EventEmitter()

  ngAfterViewInit() {
    document.addEventListener('mousedown', (event) => {
      const popup = document.getElementById("dimension-popup");
      if (!popup) {
        return;
      }

      let answer = popup.contains(event.target as HTMLElement);
      if (this.info && !answer) {
        this.info.open = false;
        this.closed.emit(true);
        this.cd.detectChanges();
      }
    })
  }

  emitChanged() {
    this.changed.emit(true);
  }

  openInput(item: DimensionToModify) {
    item.open = true;
  }
}
