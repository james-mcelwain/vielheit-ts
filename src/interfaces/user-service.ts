import IUser from './user'

interface IUserService {
    getAll: () => Promise<Array<IUser>>
    add: (req: IUser) => Promise<number>
    updatePassword: (userId: number, oldPassword: string, newPassword: string) => any
    authenticate: (candidate: string, user: IUser) => Promise<string>
    findByEmail: (email: string) => Promise<IUser>
    findById: (id: string | number) => Promise<IUser>
    empty: () => any
    onBootstrap: () => any
}

export default IUserService