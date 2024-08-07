import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-increment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-increment.component.html',
  styleUrl: './input-increment.component.scss'
})
export class InputIncrementComponent {
  @ViewChild('sizeSpan') sizeSpan!: ElementRef<HTMLElement>;

  @Input() min: number = 0;
  @Input() transparentBg = false;
  @Input() smallInputText = false;
  @Input() target;
  @Input() targetNumber = -1;
  @Input() hideControls = false;
  @Input() suffix = '';
  @Input() title = ''
  @Output() updated = new EventEmitter();
  controlsExpanded = signal(true);

  ngAfterViewInit() {
    document.addEventListener('mousedown', (event) => {
      if (!this.controlsExpanded) {
        return
      }
    });
    this.targetChange(false);
  }

  showControls() {
    this.controlsExpanded.set(!this.controlsExpanded());
  }

  increment() {
    if (this.target) {
      this.target.update(s => parseFloat((s + 1).toFixed(2)));
      this.updated.emit(this.target())
    }
    if (this.targetNumber) {
      this.targetNumber++;
      this.targetNumber = sanitizeNumber(this.targetNumber);
      this.updated.emit(this.targetNumber)
    }
  }

  incrementSmall() {
    if (this.target) {
      this.target.update(s => parseFloat((s + 0.1).toFixed(2)));
      this.updated.emit(this.target())
    }
    if (this.targetNumber) {
      this.targetNumber += 0.1;
      this.targetNumber = sanitizeNumber(this.targetNumber);
      this.updated.emit(this.targetNumber)
    }
  }

  decrement() {
    if (this.target) {
      this.target.update(s => parseFloat((Math.max(s - 1, this.min)).toFixed(2)));
      this.updated.emit(this.target())
    }
    if (this.targetNumber) {
      this.targetNumber--;
      this.targetNumber = sanitizeNumber(this.targetNumber);
      this.updated.emit(this.targetNumber)
    }
  }

  decrementSmall() {
    if (this.target) {
      this.target.update(s => parseFloat((Math.max(s - 0.1, this.min)).toFixed(2)));
      this.updated.emit(this.target())
    }
    if (this.targetNumber) {
      this.targetNumber -= 0.1;
      this.targetNumber = sanitizeNumber(this.targetNumber);
      this.updated.emit(this.targetNumber)
    }
  }

  targetChange(emitEvent: boolean = true) {
    setTimeout(() => {
      if (!this.sizeSpan) {
        return
      }
      const spanElement = this.sizeSpan.nativeElement;
      spanElement.innerText = this.targetNumber.toString();
      if (emitEvent) {
        this.updated.emit(this.targetNumber)
      }
    }, 1);
  }
}

export function sanitizeNumber(num: number): number {
  return parseFloat(parseFloat(num.toString()).toFixed(2));
}