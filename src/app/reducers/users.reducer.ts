import { createSelector, createFeatureSelector } from '@ngrx/store';
import { List, Map } from 'immutable';
import * as users from '../actions/users.action';
import { User } from 'models/User';

export interface State {
    ids: number[],
    users: {[key: number]: User},
    selected: number | null
}

export const initialState: State = {
    ids: [],
    users: {},
    selected: null
};

export function reducer(state: State = initialState, action: users.Action) {
    switch(action.type) {
        case users.ADD_USER_SUCCESS: {
            const user: User = (action as users.AddUserSuccessAction).user;
            const ids = List(state.ids).push(user.id).toJS();
            const users = Map(state.users).set(`${user.id}`, user).toJS();
            return {
                ids,
                users,
                selected: state.selected
            }
        }
        case users.EDIT_USER_SUCCESS: {
            const user: User = (action as users.EditUserSuccessAction).user;
            const users = Map(state.users).set(`${user.id}`, user).toJS();
            return {
                ids: state.ids,
                users,
                selected: state.selected
            }
        }
        case users.DELET_USER: {
            const idUser: number = (action as users.DeleteUserAction).id;
            const ids = List(state.ids).filter((id: number) => id !== idUser);
            const users = Map(state.users).delete(`${idUser}`).toJS();
            return {
                ids,
                users,
                selected: state.selected === idUser ? null : state.selected
            }
        }
        case users.LOAD_USERS_SUCCESS: {
            const usersArray: User[] = (action as users.LoadUsersSuccessAction).users;
            const ids: number[] = List(usersArray).map((user: User) => user.id).toJS();
            const users: {[key: number]: User} = {};
            ids.forEach((id: number, index: number) => users[id] = usersArray[index]);
            return {
                ids,
                users,
                selected: null
            }
        }
        case users.SELECT_USER: {
            const idUser: number = (action as users.SelectUserAction).id;
            return {
                ids: state.ids,
                users: state.users,
                selected: idUser
            }
        }
        default: {
            return state;
        }
    }
}

export const getusersState = createFeatureSelector<State>('users');

export const getSelectedId = createSelector(getusersState, (state: State) => state.selected);

export const getUsersObject = createSelector(getusersState, (state: State) => state.users);

export const getUsersArray = createSelector(getusersState, (state: State) => Object.values(state.users));

export const getSelectedUser = createSelector(getUsersObject, getSelectedId, (users: {[key: number]: User}, id: number) => users[id]);