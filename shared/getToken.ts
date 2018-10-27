const jwt = require('jsonwebtoken');
import { IUser } from '../models/IUser';

export function getToken(user: IUser | null, secret: string): string {
    const token: string = jwt.sign(user, secret, { expiresIn: '10h' });

    return token;
}