import IServiceReq from "../../domain/request/service-request";
import IHttpError from "./http-error";
import ISessionService from "../interfaces/session-service";
import IServiceRes from "../../domain/response/service-response";

interface IHttpService {
    httpErrors: IHttpError[]
    clearErrors(): void
    getErrorMessage(): string
    get(url: string): Promise<IServiceRes>
    post(url: string, payload: IServiceReq): Promise<IServiceRes>
    put(url: string, payload: IServiceReq): Promise<IServiceRes>
    getSessionService(): ISessionService
}

export default IHttpService
