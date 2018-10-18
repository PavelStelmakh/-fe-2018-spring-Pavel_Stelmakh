import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { checkUsername } from '../shared/checkUsername';

export function usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return of(null).pipe(
            delay(3000),
            switchMap(() => checkUsername(control))
            );
    }
}