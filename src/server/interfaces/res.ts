import {Response, Next} from "restify";
import {ServerResponse} from "http";

interface IRes extends Response, ServerResponse {
    writeHead(...args: Array<any>): any,
    end(...args: Array<any>): any,
    redirect(url: string, next: Next): void
    statusCode: number,
}

export default IRes