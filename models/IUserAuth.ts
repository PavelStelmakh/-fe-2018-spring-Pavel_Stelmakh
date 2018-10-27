import { IUser } from './IUser';

export interface IUserAuth {
    isAuthenticated: boolean,
    user: IUser | null
}