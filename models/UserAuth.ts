import { User } from './User';

export interface UserAuth {
    isAuthenticated: boolean,
    user: User | null
}