import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Map, fromJS } from 'immutable';
import * as language from '../actions/language.action';

export interface State {
    lang: string;
}

export const initialState: State = {
    lang: 'en'
};

export function reducer(state: State = initialState, action: language.Action): State {
    switch(action.type) {
        case language.SELECT_LANG: {
            return Map(fromJS(state)).set('lang', action.lang).toJS() as State;
        }
        default: {
            return state;
        }
    }
}

export const getLangState = createFeatureSelector<State>('lang');

export const getLang = createSelector(getLangState, (state: State) => state.lang);