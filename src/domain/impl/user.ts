import IUser from "../user";
import {ISerializableUser} from "../user";

class User implements IUser {
    public username: string;
    public fname: string;
    public lname: string;
    public email: string;

    private auth = false;

    public constructor(user: IUser) {
        this.username = user.username;
        this.fname = user.fname;
        this.lname = user.lname;
        this.email = user.email;
    }

    public getFullName(): string {
        return `${this.fname} ${this.lname}`
    }

    public isAuthenticated(): boolean {
        return this.auth
    }

    public serialize(): ISerializableUser {
        return {
            username: this.username,
            fname: this.fname,
            lname: this.lname,
            email: this.email,
        }
    }

    public setAuth(auth: boolean): void {
        this.auth = auth;
    }
}

export default User