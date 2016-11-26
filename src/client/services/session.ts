import IHttpService from "../interfaces/http-service";
import ISessionService from "../interfaces/session-service";

class SessionService implements ISessionService{
    public setSession(token: string): void {
        localStorage.setItem('session', token)
    }

    public getSession(): string {
        return localStorage.getItem('session')
    }

    public clearSession(): void {
        localStorage.clear();
    }

    public hasSession(): boolean {
        return this.getSession() !== null;
    }
}

export default SessionService