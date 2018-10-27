const users = require('../../assets/users.json');
import { IUser } from './IUser';
import { IUserAuth } from './IUserAuth';
import { ISignIn } from './ISignIn';
import { IRecovery } from './IRecovery';
const { has } = require('lodash');
import * as moment  from 'moment';

class Users {
    private _users: IUser[] = users || [];

    users(): IUser[] {
        return this._users;
    }

    user(id: number): IUser | undefined {
        return this._users.find((user: IUser) => user.id === id);
    }

    update(id: number, data: IUser): boolean {
        if(!this._users.length) return false;
        if (!this._users.some((user: IUser) => user.id === id)
            || !data
            || !this.check(data)) return false;
        const index: number = this._users.findIndex((user: IUser) => user.id === id);
        const password: string = this._users[index].password;
        this._users[index] = {id, password, ...data};
        return true;
    }

    checkExistName(name: string): boolean {
        return this._users.find((user: IUser) => user.name === name) ? true : false;
    }

    checkLogin(log: ISignIn): IUserAuth  {
        // const user: IUser | undefined = this._users.find((user: IUser) => {
        //     if (user.name === log.login && user.password === log.password) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // });
        const user: IUser | undefined = this._users.find((user: IUser) => user.name === log.login && user.password === log.password);
    
        if (user) {
            return {
                isAuthenticated: true,
                user
            };
        } else {
            return {
                isAuthenticated: false,
                user: null
            };
        }
    }

    recoveryLogin(rec: IRecovery): boolean {
        try {
            const user: IUser | undefined = this._users.find((user: IUser) => {
                if (user.name === rec.login && 
                    moment(user.dateOfBirth).utcOffset('+04:00').format('YYYY/MM/DD') === rec.birthday) {
                    return true;
                } else {
                    return false;
                }
            });
        
            if (user) {
                user.password = rec.password;
                return true;
            } else {
                return false;
            }
        } catch(Error) {
            return false;
        }
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
        data.id = id;
        this._users.push({...data});
        return true;
    }

    delete(id: number): boolean {
        if (!this._users.some((user: IUser) => user.id === id)) return false;
        this._users = this._users.filter((user: IUser) => user.id !== id);
        return true;
    }

    check(data: IUser): boolean {
        try {
            const property: string[] = ['name', 'age', 'dateOfBirth', 'dateOfFirstLogin', 'dateOfNextNotif', 'information'];
            property.forEach(key => {
                if(!has(data, key)) throw Error;
            });//check for conversion to a date object
            data.dateOfBirth = moment(data.dateOfBirth).toISOString(true);
            data.dateOfFirstLogin = moment(data.dateOfFirstLogin).toISOString(true);//if the date is not in the ISOstring format
            data.dateOfNextNotif = moment(data.dateOfNextNotif).toISOString(true);
            return true;
        } catch (Error) {
            return false;
        }
    }

}

module.exports = new Users;