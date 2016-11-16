import {observable} from "mobx";
import IUser from "../../server/interfaces/user"; // TODO move to domain
import {IAddUserReq} from "../../server/interfaces/user-service";
import {authenticateUser} from "../http";

export class UserStore implements IUserStore {
    @observable
    public user: IUser;

    public async authenticateUser(addUserReq: IAddUserReq): void {
        this.user = <IUser> await authenticateUser(addUserReq)
    }
}

export interface IUserStore {
    user: IUser

    authenticateUser(addUserReq: IAddUserReq): void
}

