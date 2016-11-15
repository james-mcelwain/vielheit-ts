import {observable} from "mobx";
import IUser from "../../server/interfaces/user"; // TODO move to domain
import * as http from "axios";
import {IAddUserReq} from "../../server/interfaces/user-service";

export class UserStore implements IUserStore {
    @observable
    public user: IUser;

    public async authenticateUser(addUserReq: IAddUserReq): void {
        this.user = <IUser> await http.post('/ap/users/authenticate', addUserReq)
    }
}

export interface IUserStore {
    user: IUser

    authenticateUser(addUserReq: IAddUserReq): void
}

