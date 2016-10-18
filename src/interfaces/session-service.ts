import IUser from './user'

interface ISessionService {
    setSession(user: IUser): Promise<string>
    getSession(token: string): any
    clearSession(): any
}

export default ISessionService