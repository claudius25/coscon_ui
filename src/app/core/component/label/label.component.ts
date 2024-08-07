import { Component, Input, inject } from '@angular/core';
import { TranslatePipe } from '../../pipe/translate.pipe';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {

  settingsService = inject(SettingsService);
  @Input() isPrice = false;
  @Input() renderCurrency = true;

  @Input() target;
  @Input() title = ''
  @Input() upperTitle = ''
  @Input() align = 'center';
}
