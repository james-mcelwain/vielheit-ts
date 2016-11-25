import IUser from "../../domain/user";
import {IAuthenticateUserReq, IAddUserReq, IFindEmailReq} from "../../domain/request/user";

interface IUserStore {
    user: IUser

    authenticateUser(authenticateUserReq: IAuthenticateUserReq): void
    addUser(addUserReq: IAddUserReq): void
    findEmail(findEmailReq: IFindEmailReq): Promise<boolean>
}

export default IUserStore