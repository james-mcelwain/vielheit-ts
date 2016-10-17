import IUser from './user'

interface IUserService {
    updatePassword: (userId: number, oldPassword: string, newPassword: string) => any,
    authenticate: (candidate: string, passwordHash:string) => Promise<boolean>,
    findByEmail: (email: string) => Promise<IUser>
}

export default IUserService