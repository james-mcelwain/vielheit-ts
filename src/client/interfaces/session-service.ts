import IHttpService from "./http-service";
interface ISessionService {
    constructor(httpService: IHttpService)

    getSession()
    setSession()
    clearSession()
}