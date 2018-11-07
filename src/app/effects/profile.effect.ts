import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import * as profile from '../actions/profile.action';
import { UsersService } from '../users.service';
import { User } from 'models/User';

@Injectable()
export class ProfileEffect {

    constructor(
        private actions$: Actions, 
        private usersService: UsersService
        ) {}

    @Effect() loadUser$: Observable<Action> = this.actions$
    .ofType(profile.LOAD_PROFILE)
    .pipe(
        mergeMap(() => this.usersService.getUser()
        .pipe(
            map((result) => new profile.LoadProfileSuccessAction(result.body as User))
        ))
    );

    @Effect() editUser$: Observable<Action> = this.actions$
    .ofType(profile.EDIT_PROFILE)
    .pipe(
        mergeMap((action: profile.EditProfileAction) => this.usersService.update(action.user, action.user.id)
        .pipe(
            map(() => new profile.EditProfileSuccessAction(action.user))
        ))
    );

}