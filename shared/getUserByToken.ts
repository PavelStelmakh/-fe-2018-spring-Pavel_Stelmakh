import { Request } from 'express';
import { IUser } from '../models/IUser';
import { getUser } from '../shared/getUser';

export function getUserByToken(req: Request) {
    const data: {[key: string]: IUser | null} = {};

    const token: string = req.cookies['auth_token'];
    if (token) {
        data.user = getUser(token, req.app.get('secret'));
    }
    return data;
}