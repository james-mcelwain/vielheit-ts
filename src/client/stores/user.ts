import {observable} from "mobx";
import IUser from "../../server/interfaces/user"; // TODO move to domain
import {IAuthenticateUserReq, IAddUserReq} from "../../domain/request/user";
import {IHttpService} from "../services/http";

export class UserStore implements IUserStore {
    @observable
    public user: IUser;
    private httpService: IHttpService;

    public constructor(httpservice: IHttpService) {
       this.httpService = httpservice;
    }

    public async authenticateUser(authenticateUserReq: IAddUserReq): void {
        this.user = <IUser> await this.httpService.post(`users/authenticate`, authenticateUserReq)
    }

    public  async addUser(addUserReq: IAddUserReq): void {
        const res = await this.httpService.post('users/add', addUserReq);
    }
}

export interface IUserStore {
    user: IUser

    authenticateUser(authenticateUserReq: IAuthenticateUserReq): void
    addUser(addUserReq: IAddUserReq): void
}

