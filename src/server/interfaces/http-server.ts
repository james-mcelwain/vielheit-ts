import {RequestHandler} from "restify";

interface IHTTPServer {
    listen: () => any,
    close: (callback: any) => any,
    onBootstrap(fn: () => any): any
    registerMiddleware(fn: RequestHandler): any
    registerMiddleware(fn: RequestHandler, sort: number): any
}

export default IHTTPServer