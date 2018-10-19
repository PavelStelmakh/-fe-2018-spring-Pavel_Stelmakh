export interface IUser {
    id: number,
    name: string,
    password: string,
    dateOfBirth: string,
    dateOfFirstLogin: string,
    dateOfNextNotif: string,
    information: string | null
}