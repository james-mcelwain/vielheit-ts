import IUser from "./user";

interface IUserService {
    getAll: () => any
    add: (req: IUser) => Promise<Number>
    updatePassword: (userId: Number, oldPassword: String, newPassword: String) => any
    authenticate: (candidate: String, user: IUser) => Promise<String>
    findByEmail: (email: String) => Promise<IUser>
    findById: (id: String | Number) => Promise<IUser>
    empty: () => any
    onBootstrap: () => any
}

export default IUserService