import {Response, Next} from "restify";
import {ServerResponse} from "http";

interface IRes extends Response {
    writeHead(...args: Array<any>): any,
    end(...args: Array<any>): any,
    statusCode: number,
}

export default IRes