import { Action } from '@ngrx/store';

export const SELECT_LANG: string = '[LANGUAGE] Select';

export class SelectAction implements Action {
    readonly type: string = SELECT_LANG;

    constructor(public lang: string) {}
}

export type Action = SelectAction;