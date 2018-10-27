const jwt = require('jsonwebtoken');
import { IUser } from '../models/IUser';

export function getUser(token: string, secret: string): IUser | null {
    try {
        const user: IUser = jwt.verify(token, secret);
        return user;
    } catch(e) {
        return null;
    }
}