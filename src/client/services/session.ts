import IHttpService from "../interfaces/http-service";
import ISessionService from "../interfaces/session-service";

class SessionService implements ISessionService{
    public setSession(): void {

    }

    public getSession(): string {
        return ''
    }

    public clearSession(): boolean {
        return true
    }
}

export default SessionService