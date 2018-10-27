import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, switchMap, catchError } from 'rxjs/operators';
import { UsersService } from '../users.service';
//ifExist - function return true if name found else false
export function checkExistNameValidator(service: UsersService, ifExist: boolean = false): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {        
        return of(null).pipe(
            delay(200),
            switchMap(() => {
                return service.checkExistName(control.value).pipe(
                    switchMap(response => {
                        if (response.status === 200) {
                            return !ifExist ? of(null) : of({checkExistName: control.value});
                        }
                    }),
                    catchError(error => ifExist ? of(null) : of({checkExistName: control.value}))
                )
            })
        );
    }
}