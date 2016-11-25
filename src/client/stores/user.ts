import {observable} from "mobx";
import IUser from "../../server/interfaces/user"; // TODO move to tomain
import {IAuthenticateUserReq, IAddUserReq} from "../../domain/request/user";
import IHttpService from "../interfaces/http-service";

export class UserStore implements IUserStore {
    @observable
    public user: IUser;
    private httpService: IHttpService;

    public constructor(httpservice: IHttpService) {
       this.httpService = httpservice;
    }

    public async authenticateUser(authenticateUserReq: IAddUserReq): void {
        const token = <IUser> await this.httpService.post(`users/authenticate`, authenticateUserReq);
        console.log(token)
        this.httpService.getSessionService().setSession(token);
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

