const users = require('../../assets/users.json');
import { User } from './User';
const _ = require('lodash');

interface IUser {
    name: string,
    password: string,
    dateOfBirth: string,
    dateOfFirstLogin: string,
    dateOfNextNotif: string,
    information: string | null
}


class Users {
    private _users: User[] = users || [];

    users(): User[] {
        return this._users;
    }

    user(id: number): User | undefined {
        return this._users.find((user: User) => user.id === id);
    }

    update(id: number, data: IUser): boolean {
        if(!this._users.length) return false;
        if (!this._users.some((user: User) => user.id === id)
            || !data
            || !this.check(data)) return false;
        const index: number = this._users.findIndex((user: User) => user.id === id);
        this._users[index] = { id, ...data};
        return true;
    }

    add(data: IUser): boolean {
        if (!data || !this.check(data)) return false;
        let id: number;
        if (this._users.length == 0) {
            id = 1;
        } else {
            const idArray: number[] = this._users.map(user => user.id);
            id = Math.max(...idArray) + 1;
        }
        const user: User = new User(id, data.name, data.password, data.dateOfBirth,
            data.dateOfFirstLogin, data.dateOfNextNotif, data.information);
        this._users.push(user);
        return true;
    }

    delete(id: number): boolean {
        if (!this._users.some((user: User) => user.id === id)) return false;
        this._users = this._users.filter((user: User) => user.id !== id);
        return true;
    }

    check(data: IUser): boolean {
        try {
            const property: string[] = ['name', 'password', 'dateOfBirth', 'dateOfFirstLogin', 'dateOfNextNotif', 'information'];
            property.forEach(key => {
                if(!_.has(data, key)) throw Error;
            });
            const checkDateOfBirth = new Date(data.dateOfBirth);
            const checkDateOfFirstLogin = new Date(data.dateOfFirstLogin);//check for conversion to a date object
            const checkDateOfNextNotif = new Date(data.dateOfNextNotif);
            data.dateOfBirth = checkDateOfBirth.toISOString();
            data.dateOfFirstLogin = checkDateOfFirstLogin.toISOString();//if the date is not in the ISOstring format
            data.dateOfNextNotif = checkDateOfNextNotif.toISOString();
            return true;
        }
        catch (Error) {
            return false;
        }
    }

}

module.exports = Users;