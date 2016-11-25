import IHttpService from "../interfaces/http-service";
import ISessionService from "../interfaces/session-service";

class SessionService extends ISessionService{
    private httpService: IHttpService;

    constructor(httpService: IHttpService) {
        this.httpService = httpService;
    }

    public setSession() {

    }

    public getSession() {

    }

    public clearSession() {

    }
}