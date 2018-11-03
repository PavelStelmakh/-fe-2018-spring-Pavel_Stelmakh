const jwt = require('jsonwebtoken');
import { User } from '../models/User';

export function getToken(user: User | null, secret: string): string {
    const token: string = jwt.sign(user, secret, { expiresIn: '10h' });

    return token;
}