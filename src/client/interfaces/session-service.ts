import IHttpService from "./http-service";

interface ISessionService {
    getSession(): string
    setSession(): void
    clearSession(): boolean
}

export default ISessionService;