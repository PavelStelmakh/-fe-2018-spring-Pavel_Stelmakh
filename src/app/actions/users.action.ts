import { Action } from '@ngrx/store';
import { User } from 'models/User';

export const ADD_USER = '[USERS] Add User';
export const ADD_USER_SUCCESS = '[USERS] Add User Success';
export const EDIT_USER = '[USERS] Edit User';
export const EDIT_USER_SUCCESS = '[USERS] Edit User Success';
export const DELET_USER = '[USERS] Delete User';
export const LOAD_USERS = '[USERS] Load Users';
export const LOAD_USERS_SUCCESS = '[USERS] Load Users Success';
export const SELECT_USER = '[USERS] Select User';

export class AddUserAction implements Action {
    readonly type: string = ADD_USER;

    constructor(public user: User) {}
}

export class AddUserSuccessAction implements Action {
    readonly type: string = ADD_USER_SUCCESS;

    constructor(public user: User) {}
}

export class EditUserAction implements Action {
    readonly type: string = EDIT_USER;

    constructor(public user: User) {}
}

export class EditUserSuccessAction implements Action {
    readonly type: string = EDIT_USER_SUCCESS;

    constructor(public user: User) {}
}

export class DeleteUserAction implements Action {
    readonly type: string = DELET_USER;

    constructor(public id: number) {}
}

export class LoadUsersAction implements Action {
    readonly type: string = LOAD_USERS;

    constructor(public name: string) {}
}

export class LoadUsersSuccessAction implements Action {
    readonly type: string = LOAD_USERS_SUCCESS;

    constructor(public users: User[]) {}
}

export class SelectUserAction implements Action {
    readonly type: string = SELECT_USER;

    constructor(public id: number) {}
}

export type Action = 
AddUserAction | AddUserSuccessAction | EditUserAction | EditUserSuccessAction 
| DeleteUserAction | LoadUsersAction | LoadUsersSuccessAction | SelectUserAction;