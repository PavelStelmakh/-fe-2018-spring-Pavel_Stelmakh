import { Action } from '@ngrx/store';
import { User } from '../../../models/User';

export const SET_ID = '[PROFILE] Set Id';
export const LOAD_PROFILE = '[PROFILE] Load Profile';
export const LOAD_PROFILE_SUCCESS = '[PROFILE] Load Profile Success';
export const EDIT_PROFILE = '[PROFILE] Edit Profile';
export const EDIT_PROFILE_SUCCESS = '[PROFILE] Edit Profile Success';

export class SetIdAction implements Action {
    readonly type: string = SET_ID;

    constructor(public id: number) {}
}

export class LoadProfileAction implements Action {
    readonly type: string = LOAD_PROFILE;
}

export class LoadProfileSuccessAction implements Action {
    readonly type: string = LOAD_PROFILE_SUCCESS;

    constructor(public user: User) {}
}

export class EditProfileAction implements Action {
    readonly type: string = EDIT_PROFILE;

    constructor(public user: User) {}
}

export class EditProfileSuccessAction implements Action {
    readonly type: string = EDIT_PROFILE_SUCCESS;

    constructor(public user: User) {}
}

export type Action = SetIdAction | LoadProfileAction | LoadProfileSuccessAction | EditProfileAction | EditProfileSuccessAction;