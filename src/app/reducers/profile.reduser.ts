import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as profile from '../actions/profile.action';
import { User } from 'models/User';

export interface State {
    id: number | null;
    user: User | null;
}

export const initialState: State = {
    id: null,
    user: null
};

export function reducer(state: State = initialState, action: profile.Action) {
    switch(action.type) {
        case profile.SET_ID: {
            const id: number = (action as profile.SetIdAction).id;            
            return {id, user: null};
        }
        case profile.LOAD_PROFILE_SUCCESS: {
            const user: User = (action as profile.LoadProfileSuccessAction).user;            
            return {id: state.id, user};
        }
        case profile.EDIT_PROFILE_SUCCESS: {
            const user: User = (action as profile.EditProfileSuccessAction).user;            
            return {id: state.id, user};
        }        
        default: {
            return state;
        }
    }
}

export const getProfileState = createFeatureSelector<State>('profile');

export const getProfileId = createSelector(getProfileState, ((state: State) => state.id));

export const getProfileUser = createSelector(getProfileState, ((state: State) => state.user));