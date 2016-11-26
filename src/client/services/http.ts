import * as axios from 'axios';
import {observable} from "mobx";
import IServiceReq from "../../domain/request/service-request";
import {API_BASE} from "../../server/config/constants";
import IHttpError from "../interfaces/http-error";
import IHttpService from "../interfaces/http-service";
import ISessionService from "../interfaces/session-service";

const http = axios.create({});

export class HttpService implements IHttpService {
    @observable
    public httpErrors: IHttpError[] = [];
    private sessionService: ISessionService;

    private httpOpts = {
        validateStatus: (status: number) => {
            return (status >= 200 && status < 300) || status === 400
        }
    };

    public constructor(sessionService: ISessionService) {
        this.sessionService = sessionService;

        http.interceptors.response.use((res) => {
            if (res.headers['CLEAR-SESSION']) {
                this.sessionService.clearSession()
            }
            return res
        });
    }

    private async doRequest(method: string, url: string, payload: IServiceReq = {}) {
        let httpOpts = this.httpOpts;
        if (this.sessionService.getSession()) {
            console.log(this.sessionService.getSession())
            httpOpts = Object.assign({
                headers: {
                    'Authorization': `Bearer ${this.sessionService.getSession()}`
                }
            }, httpOpts);
        }

        const res = <any> await Reflect.get(http, method).call(this, `${API_BASE}${url}`, payload, httpOpts);
        if (res.status === 400) {
            JSON.parse(res.data.message).errors.forEach((x: IHttpError) => this.httpErrors.push(x))
        }
        return res.data
    }

    public clearErrors(): void {
        this.httpErrors = []
    }

    public getErrorMessage(): string {
        return this.httpErrors.map(x => `${x.property}: ${x.errorName}`).join('')
    }

    public async get(url: string) {
        return this.doRequest('get', url)
    }

    public async post(url: string, payload: IServiceReq) {
        return this.doRequest('post', url, payload)
    }

    public async put(url: string, payload: IServiceReq) {
        return this.doRequest('put', url, payload)
    }

    public getSessionService(): ISessionService {
        return this.sessionService
    }
}

