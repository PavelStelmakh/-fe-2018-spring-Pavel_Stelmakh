const jwt = require('jsonwebtoken');
import { User } from '../models/User';

export function getUser(token: string, secret: string): User | null {
    try {
        const user: User = jwt.verify(token, secret);
        return user;
    } catch(e) {
        return null;
    }
}