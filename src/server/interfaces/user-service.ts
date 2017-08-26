import IUser from "./user";
import {IAddUserReq} from "../../domain/request/user";
import {ISerializableUser} from "../../domain/user";

interface IUserService {
    getAll: () => Promise<Array<IUser>>
    add: (req: IAddUserReq) => Promise<number>
    updatePassword: (userId: number, oldPassword: string, newPassword: String) => any
    authenticate: (candidate: string, user: ISerializableUser) => Promise<String>
    findByEmail: (email: string) => Promise<IUser | null>
    findById: (id: string | number) => Promise<IUser | null>
    empty: () => any
    onBootstrap: () => any
}

export default IUserService