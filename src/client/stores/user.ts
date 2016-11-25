import {observable} from "mobx";
import {IAddUserReq, IFindEmailReq} from "../../domain/request/user";
import IHttpService from "../interfaces/http-service";
import {IAuthenticateUserRes, IFindEmailRes} from "../../domain/response/user";
import IUser from "../../domain/user";
import IUserStore from "../interfaces/user-store";

class UserStore implements IUserStore {
    @observable
    public user: IUser;
    private httpService: IHttpService;

    public constructor(httpservice: IHttpService) {
       this.httpService = httpservice;
    }

    public async authenticateUser(authenticateUserReq: IAddUserReq): Promise<void> {
        const token = <IAuthenticateUserRes> await this.httpService.post(`users/authenticate`, authenticateUserReq);
        console.log(token);
    }

    public  async addUser(addUserReq: IAddUserReq): Promise<void> {
        const res = await this.httpService.post('users/add', addUserReq);
    }

    public async findEmail(findEmailReq: IFindEmailReq): Promise<boolean> {
        const res = <IFindEmailRes> await this.httpService.post('users/find-email', findEmailReq);
        return res.exists
    }
}

export default UserStore
