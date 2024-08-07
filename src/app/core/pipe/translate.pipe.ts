import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../service/translate.service';

@Pipe({
  standalone: true,
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(public translateService: TranslateService) {
  }
  transform(key: string): string {
    return this.translateService.instant(key);
  }
}