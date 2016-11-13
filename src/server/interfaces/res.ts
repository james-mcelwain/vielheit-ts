import {Response} from "restify";
import {ServerResponse} from "http";

interface IRes extends Response, ServerResponse {
    writeHead(...args: Array<any>): any,
    end(...args: Array<any>): any,
    statusCode: number,
}

export default IRes