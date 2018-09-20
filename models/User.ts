//namespace UserSpace {
    export class User {
        // private _id: number;
        // private _name: string;
        // private _password: string;
        // private _dateOfBirth: Date;
        // private _dateOfFirstLogin: Date;
        // private _dateOfNextNotif: Date;
        // private _information: string | null;

        constructor(public id: number,
                    public name: string,
                    public password: string,
                    public dateOfBirth: string = new Date().toISOString(),
                    public dateOfFirstLogin: string = new Date().toISOString(),
                    public dateOfNextNotif: string = new Date().toISOString(),
                    public information: string | null = null) {
            // this._id = id;
            // this._name = name;
            // this._password = password;
            // this._dateOfBirth = dateOfBirth;
            // this._dateOfFirstLogin = dateOfFirstLogin;
            // this._dateOfNextNotif = dateOfNextNotif;
            // this._information = information;
        }

        // get id(): number {
        //     return this._id;
        // }
        //
        // get name(): string {
        //     return this._name;
        // }
        //
        // get password(): string {
        //     return this._password;
        // }
        //
        // get dateOfBirth(): string {
        //     return this._dateOfBirth.toISOString();
        // }
        //
        // get dateOfFirstLogin(): string {
        //     return this._dateOfFirstLogin.toISOString();
        // }
        //
        // get dateOfNextNotif(): string {
        //     return this._dateOfNextNotif.toISOString();
        // }
        //
        // get information(): string | null {
        //     return this._information;
        // }

    }
//export User;
    //module.exports = User;
//}