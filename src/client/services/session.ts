import IHttpService from "../interfaces/http-service";
import ISessionService from "../interfaces/session-service";

class SessionService implements ISessionService{
    private httpService: IHttpService;

    public constructor(httpService: IHttpService) {
        this.httpService = httpService;
    }

    public setSession() {

    }

    public getSession() {

    }

    public clearSession() {

    }
}

export default SessionService