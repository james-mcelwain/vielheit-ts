interface IUserService {
    updatePassword: (userId: number, oldPassword: string, newPassword: string) => any,
    authenticate: (userId: number, password: string) => any
}

export default IUserService