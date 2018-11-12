import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap, map, catchError } from 'rxjs/operators';
import * as users from '../actions/users.action';
import { UsersService } from '../users.service';
import { User } from '../../../models/User';

@Injectable()
export class UsersEffect {

    constructor(private actions$: Actions, private usersService: UsersService) {}

    @Effect() add$: Observable<Action> = this.actions$
    .ofType(users.ADD_USER)
    .pipe(
        mergeMap((action: users.AddUserAction) => this.usersService.addUser(action.user)
        .pipe(
            map((response) => new users.AddUserSuccessAction(response.body as User))
        ))
    );

    @Effect() edit$: Observable<Action> = this.actions$
    .ofType(users.EDIT_USER)
    .pipe(
        mergeMap((action: users.EditUserAction) => this.usersService.update(action.user, action.user.id)
        .pipe(
            map(() => new users.EditUserSuccessAction(action.user))
        ))
    );

    @Effect({dispatch: false}) delete$ = this.actions$
    .ofType(users.DELET_USER)
    .pipe(
        switchMap((action: users.DeleteUserAction) => this.usersService.deleteUser(action.id))
    );

    @Effect() load$ = this.actions$
    .ofType(users.LOAD_USERS)
    .pipe(
        mergeMap((action: users.LoadUsersAction) => this.usersService.search(action.name)
        .pipe(
            map((usersArray: User[]) => new users.LoadUsersSuccessAction(usersArray)),
            catchError(() => of(new users.LoadUsersSuccessAction([])))
        ))
    );

}