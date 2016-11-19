import IUser from "./user";
import {IAddUserReq} from "../../domain/request/user";

interface IUserService {
    getAll: () => any
    add: (req: IAddUserReq) => Promise<number>
    updatePassword: (userId: number, oldPassword: string, newPassword: String) => any
    authenticate: (candidate: string, user: IUser) => Promise<String>
    findByEmail: (email: string) => Promise<IUser>
    findById: (id: string | number) => Promise<IUser>
    empty: () => any
    onBootstrap: () => any
}

export default IUserService