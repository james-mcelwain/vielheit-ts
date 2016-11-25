import IServiceReq from "../../domain/request/service-request";
import IHttpError from "./http-error";
import ISessionService from "../../server/interfaces/session-service";

interface IHttpService {
    constructor(sessionService: ISessionService)

    httpErrors: IHttpError[]
    clearErrors()
    getErrorMessage(): string
    get(url: string)
    post(url: string, payload: IServiceReq)
    put(url: string, payload: IServiceReq)
    getSessionService(): ISessionService
}

export default IHttpService
