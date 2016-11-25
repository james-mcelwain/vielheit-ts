import IHttpService from "../interfaces/http-service";
import ISessionService from "../interfaces/session-service";

class SessionService implements ISessionService{
    public setSession(token: string): void {
        localStorage.setItem('session', token)
    }

    public getSession(): string {
        return localStorage.getItem('session')
    }

    public clearSession(): boolean {
        return true
    }
}

export default SessionService