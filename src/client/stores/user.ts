import {observable} from "mobx";
import IUser from "../../server/interfaces/user"; // TODO move to domain
import {authenticateUser, addUser} from "../http";
import {IAuthenticateUserReq, IAddUserReq} from "../../domain/request/user";

export class UserStore implements IUserStore {
    @observable
    public user: IUser;

    public async authenticateUser(authenticateUserReq: IAddUserReq): void {
        this.user = <IUser> await authenticateUser(authenticateUserReq)
    }

    public  async addUser(addUserReq: IAddUserReq): void {
        await addUser(addUserReq)
    }
}

export interface IUserStore {
    user: IUser

    authenticateUser(authenticateUserReq: IAuthenticateUserReq): void
    addUser(addUserReq: IAddUserReq): void
}

