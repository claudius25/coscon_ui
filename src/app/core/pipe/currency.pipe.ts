import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../service/settings.service';

@Pipe({
    standalone: true,
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

    constructor(public settings: SettingsService) {
    }
    transform(amount: string | number, withCurrency: boolean = true): string {
        if (amount === '') {
            return this.settings.countryInfo.currency
        }
        return `${new Intl.NumberFormat('en', { notation: 'compact' }).format(amount as number)} ${withCurrency ? this.settings.countryInfo.currency : ''}`
    }
}