const users = require('../../assets/users.json');
import { User } from './User';
import { UserAuth } from './UserAuth';
import { SignIn } from './SignIn';
import { Recovery } from './Recovery';
const { has } = require('lodash');
import * as moment  from 'moment';

class Users {
    private _users: User[] = users || [];

    users(): User[] {
        return this._users;
    }

    user(id: number): User | undefined {
        return this._users.find((user: User) => user.id === id);
    }

    search(name: string): User[] {
        if (name === 'all') {
            return this._users;
        } else {
            return this._users.filter((user: User) => ~user.name.indexOf(name));
        }
    }

    update(id: number, data: User): boolean {
        if(!this._users.length) return false;
        if (!this._users.some((user: User) => user.id === id)
            || !data
            || !this.check(data)) return false;
        const index: number = this._users.findIndex((user: User) => user.id === id);
        const password: string = this._users[index].password;
        this._users[index] = {id, password, ...data};
        return true;
    }

    checkExistName(name: string): boolean {
        return this._users.find((user: User) => user.name === name) ? true : false;
    }

    checkLogin(log: SignIn): UserAuth  {
        const user: User | undefined = this._users.find((user: User) => user.name === log.login && user.password === log.password);
    
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

    recoveryLogin(rec: Recovery): boolean {
        try {
            const user: User | undefined = this._users.find((user: User) => {
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

    add(data: User): boolean {
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
        if (!this._users.some((user: User) => user.id === id)) return false;
        this._users = this._users.filter((user: User) => user.id !== id);
        return true;
    }

    check(data: User): boolean {
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