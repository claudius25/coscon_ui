import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    private currentLangFile: any;

    initTranslate(lang: any) {
        this.currentLangFile = lang;
        return of(true);
    }

    instant(key: string): string {
        const split = key.split('.');
        let phrase = this.currentLangFile;
        split.forEach(token => {
            if (phrase) {
                phrase = phrase[token];
            }
            else {
                phrase = key;
            }
        });
        return phrase;
    }
}