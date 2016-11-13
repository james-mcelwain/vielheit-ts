import {injectable, inject} from "inversify";
import __ from "../config/constants";
import ILoggerFactory from "../interfaces/logger-factory";
import ILogger from "../interfaces/logger";
import {Request, Response, Next} from "restify";
import IHTTPServer from "../interfaces/http-server";
import {match, RouterContext} from "react-router";
import routes from "../client/routes"
import {API_BASE} from "../config/constants";
import {readFile} from "fs";
import {promisify} from "bluebird";
import * as path from "path";
import * as React from "react";
import {renderToStaticMarkup} from "react-dom/server";

const readFileA = promisify(readFile)

@injectable()
class IsomorphicReactService {
    private logger: ILogger
    @inject(__.HTTPServer) httpServer: IHTTPServer;

    public constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    public async onBootstrap() {
        this.httpServer.registerMiddleware((req: Request, res: Response, next: Next) => {
            if (req.url.includes(API_BASE)) return next();
            if (req.url.includes('public')) return next();

            match({routes, location: req.url}, async (err: Error, redirect, renderProps) => {
                try {
                    var reactMarkup = renderToStaticMarkup(<RouterContext {...renderProps}/>)
                } catch(e) {
                    console.log(':)', e)
                }
                const index = await readFileA(path.join('.', 'src/public/index.html'), 'utf-8')
                res.writeHead(200);
                res.end(index.replace(/{{ MARKUP }}/, reactMarkup));
            });
        });
    }
}

export default IsomorphicReactService;