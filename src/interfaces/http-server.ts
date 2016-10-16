import { RequestHandler } from 'restify'
import ILogger from '../interfaces/logger'

interface IHTTPServer {
    listen: () => any,
    close: (callback: any) => any,
    onBootstrap(fn: () => any): any
}

export default IHTTPServer