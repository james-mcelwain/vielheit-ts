import IUser from './user'

interface ISessionService {
    setSession(user: IUser): any
    getSession(token: string): any
    clearSession(): any
}

export default ISessionService