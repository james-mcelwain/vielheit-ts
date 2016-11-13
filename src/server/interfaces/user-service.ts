import IUser from "./user";

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

interface IBaseUser {
    email: string
    fname: string
    lname: string
    username: string
}

export interface IAddUserReq extends IBaseUser {
   password: string
}

export default IUserService