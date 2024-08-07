import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/pipe/translate.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
