import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'nicefloat'
})
export class NicefloatPipe implements PipeTransform {

    constructor() {
    }
    transform(amount: number): number {
        return parseFloat(amount.toFixed(2));
    }
}