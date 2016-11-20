import IServiceReq from "../../domain/request/service-request";
import IHttpError from "./http-error";

interface IHttpService {
    httpErrors: IHttpError[]
    clearErrors()
    getErrorMessage(): string
    get(url: string)
    post(url: string, payload: IServiceReq)
    put(url: string, payload: IServiceReq)
}

export default IHttpService
