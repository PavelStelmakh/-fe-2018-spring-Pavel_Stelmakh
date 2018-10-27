export interface IUser {
    id: number,
    name: string,
    age: number,
    password: string,
    dateOfBirth: string,
    dateOfFirstLogin: string,
    dateOfNextNotif: string,
    information: string | null
}