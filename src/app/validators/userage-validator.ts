import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function userageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const number: number = control.value;
        if (number % 1 !== 0) return {age: number}

        return number >= 18 && number <= 65 ? null : {age: number};
    }
}