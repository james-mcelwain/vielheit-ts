import {observable} from "mobx";
import IUser from "../../server/interfaces/user"; // TODO move to tomain
import {IAuthenticateUserReq, IAddUserReq, IFindEmailReq} from "../../domain/request/user";
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
        console.log(token);
    }

    public  async addUser(addUserReq: IAddUserReq): void {
        const res = await this.httpService.post('users/add', addUserReq);
    }

    public async findEmail(findEmailReq: IFindEmailReq) {
        const res = await this.httpService.post('users/find-email', findEmailReq);
        return res.exists
    }
}

export interface IUserStore {
    user: IUser

    authenticateUser(authenticateUserReq: IAuthenticateUserReq): void
    addUser(addUserReq: IAddUserReq): void
    findEmail(findEmailReq: IFindEmailReq)
}

