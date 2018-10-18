export class User {
	constructor(public id: number,
				public name: string,
				public password: string,
				public dateOfBirth: string = new Date().toISOString(),
				public dateOfFirstLogin: string = new Date().toISOString(),
				public dateOfNextNotif: string = new Date().toISOString(),
				public information: string | null = null) {
	}
}