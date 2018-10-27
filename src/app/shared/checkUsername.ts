import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function checkUsername(control: AbstractControl): Observable<ValidationErrors | null> {
    const name: string[] = control.value.trim().split(' ').filter(Boolean);
    try {
        if (name.length == 0 || name.length > 2) throw new Error;
        name.forEach(word => {            
            word.split('').forEach((letter, index) => {
                const isUpCase: boolean = letter >= 'A' && letter <= 'Z';
                const isLowerCase: boolean = letter >= 'a' && letter <= 'z';
                if (index === 0 && !isUpCase || !isLowerCase && index > 0) {
                    throw new Error;
                }
            });
        });
        return of(null);
    }
    catch (Error) {
        return of({name: control.value});
    }
}