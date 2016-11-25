import IUser from "./user";

interface ISessionService {
    setSession(): any
    getSession(): string
    clearSession(): any
}

export default ISessionService