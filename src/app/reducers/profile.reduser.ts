import { createSelector, createFeatureSelector } from '@ngrx/store';
import { List, Map } from 'immutable';
import * as profile from '../actions/profile.action';
import { User } from '../../../models/User';

export interface State {
    id: number | null;
    user: User | null;
}

export const initialState = {
    id: null,
    user: null
};

export function reducer(state = initialState, action: profile.Action) {
    switch(action.type) {
        case profile.SET_ID: {
            const stateImmutable = Map(state);
            const id: number = (action as profile.SetIdAction).id;            
            return stateImmutable.set('id', id).set('user', null).toJS();
        }
        case profile.LOAD_PROFILE_SUCCESS: {
            const stateImmutable = Map(state);
            const user: User = (action as profile.LoadProfileSuccessAction).user;    
            return stateImmutable.set('user', user).toJS();
        }
        case profile.EDIT_PROFILE_SUCCESS: {
            const stateImmutable = Map(state);
            const user: User = (action as profile.EditProfileSuccessAction).user;            
            return stateImmutable.set('user', user).toJS();
        }        
        default: {
            return state;
        }
    }
}

export const getProfileState = createFeatureSelector<State>('profile');

export const getProfileId = createSelector(getProfileState, ((state: State) => state.id));

export const getProfileUser = createSelector(getProfileState, ((state: State) => state.user));