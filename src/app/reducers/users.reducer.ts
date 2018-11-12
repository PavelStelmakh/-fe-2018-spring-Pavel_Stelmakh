import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Map, List } from 'immutable';
import * as users from '../actions/users.action';
import { User } from '../../../models/User';

export interface State {
    ids: number[],
    users: {[key: number]: User},
    selected: number | null
}

export const initialState = {
    ids: [],
    users: {},
    selected: null
};

export function reducer(state = initialState, action: users.Action) {
    switch(action.type) {
        case users.ADD_USER_SUCCESS: {
            const stateImmutable = Map(state);
            const user: User = (action as users.AddUserSuccessAction).user;
            return stateImmutable
            .updateIn(['ids'], ids => List(ids).push(user.id).toJS())
            .updateIn(['users'], users => Map(users).set(user.id, user).toJS()).toJS();
        }
        case users.EDIT_USER_SUCCESS: {
            const stateImmutable = Map(state);
            const user: User = (action as users.EditUserSuccessAction).user;
            return stateImmutable.updateIn(['users'], users => Map(users).set(user.id, user).toJS()).toJS();
        }
        case users.DELET_USER: {
            const stateImmutable = Map(state);
            const idUser: number = (action as users.DeleteUserAction).id;
            return stateImmutable
            .updateIn(['ids'], ids => ids.filter((id: number) => id !== idUser))
            .updateIn(['users'], users => Map(users).delete(`${idUser}`).toJS())            
            .updateIn(['selected'], (selected: number | null) => selected === idUser ? null : selected).toJS();
        }
        case users.LOAD_USERS_SUCCESS: {
            const stateImmutable = Map(state);
            const usersArray: User[] = (action as users.LoadUsersSuccessAction).users;
            const ids: number[] = usersArray.map((user: User) => user.id);
            const users: {[key: number]: User} = {};
            ids.forEach((id: number, index: number) => users[id] = usersArray[index]);
            return stateImmutable.set('ids', ids).set('users', users).set('selected', null).toJS();
        }
        case users.SELECT_USER: {
            const stateImmutable = Map(state);
            const idUser: number = (action as users.SelectUserAction).id;
            return stateImmutable.set('selected', idUser).toJS();
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