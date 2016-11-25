import IUser from "../../domain/user";

interface ISessionService {
    setSession(token: string): Promise<string>
    getSession(user: IUser): Promise<string>
    clearSession(): any
    onBootstrap(): any
}

export default ISessionService