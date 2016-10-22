import IUser from "./user";

interface ISessionService {
    setSession(user: IUser): Promise<String>
    getSession(token: String): any
    clearSession(): any
}

export default ISessionService