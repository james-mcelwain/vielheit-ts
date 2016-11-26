import IUser from "../../domain/user";
import IHTTPServer from "./http-server";

interface ISessionService {
    setSession(user: IUser): Promise<string>
    getSession(token: string): Promise<string>
    clearSession(sessionId: string): Promise<boolean>
    onBootstrap(server: IHTTPServer): any
}

export default ISessionService