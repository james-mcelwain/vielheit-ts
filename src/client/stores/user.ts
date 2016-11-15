import {observable} from "mobx";
import IUser from "../../server/interfaces/user"; // TODO move to domain

export class UserStore implements IUserStore {
    @observable
    public user: IUser;
}

export interface IUserStore {
    user: IUser
}

