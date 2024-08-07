import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/pipe/translate.pipe';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss'
})
export class MissionComponent {

}
