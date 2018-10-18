import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment  from 'moment';

export function dateValidator(format: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (moment(control.value, format, true).format() === 'Invalid date') return {date: control.value};
        return null;
    }
}