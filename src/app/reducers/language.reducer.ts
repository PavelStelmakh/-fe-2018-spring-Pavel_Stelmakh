import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Map, fromJS } from 'immutable';
import * as language from '../actions/language.action';

export interface State {
    lang: string;
}

export const initialState = {
    lang: 'en'
};

export function reducer(state = initialState, action: language.Action) {
    switch(action.type) {
        case language.SELECT_LANG: {
            const stateImmutable = Map(state);
            return stateImmutable.set('lang', action.lang).toJS();
        }
        default: {
            return state;
        }
    }
}

export const getLangState = createFeatureSelector<State>('lang');

export const getLang = createSelector(getLangState, (state: State) => state.lang);