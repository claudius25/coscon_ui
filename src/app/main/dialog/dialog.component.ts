import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DialogService } from '../../core/service/dialog.service';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { TranslatePipe } from '../../core/pipe/translate.pipe';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NgComponentOutlet],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  title$ = new BehaviorSubject<string>('Title');
  @ViewChild('appDialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('vcr', { static: true, read: ViewContainerRef })
  ref!: ViewContainerRef;

  constructor(public dialogService: DialogService, public cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dialogService.project$.subscribe(val => {
      if (val) {
        this.ref.createComponent(val.component);
        if (val.dialogTitle instanceof Observable) {
          this.title$ = val.dialogTitle;
          this.cd.detectChanges();
        }
        else {
          this.title$ = new BehaviorSubject<string>('Title');
          this.title$.next(val.dialogTitle);
          this.cd.detectChanges();
        }

        this.dialog.nativeElement.showModal();
      }
    })
    this.dialogService.close$.subscribe(val => {
      if (val) {
        this.closeDialog();
      }
    })
  }

  closeDialog() {
    this.ref.detach()
    this.dialog.nativeElement.close();
  }
}
