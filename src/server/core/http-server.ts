import {Server, plugins, Response, Next, RequestHandler} from "restify";
import {InversifyRestifyServer} from "inversify-restify-utils";
import container from "../config/index";
import {inject, injectable} from "inversify";
import __ from "../config/constants";
import IHttpServer from "../interfaces/http-server";
import ISessionService from "../interfaces/session-service";
import ILoggerFactory from "../interfaces/logger-factory";
import ILogger from "../interfaces/logger";
import IReq from "../interfaces/req";
import IRes from "../interfaces/res";
import {IAppConfig} from '../interfaces/app-config';

declare type process = {
    env: any,
    exit: Function
}

interface InternalServer extends Server {
    version: string
}

@injectable()
class HTTPServer implements IHttpServer {
    private server: InternalServer;
    private port: number;
    private router: InversifyRestifyServer;

    @inject(__.SessionService)
    session: ISessionService;

    public logger: ILogger;

    public constructor(
        @inject(__.AppConfig)
        config: IAppConfig,
        @inject(__.LoggerFactory)
        LoggerFactory: ILoggerFactory,
    ) {
        this.port = config.port;

        this.logger = LoggerFactory.getLogger(this);
        this.router = <InversifyRestifyServer> new InversifyRestifyServer(container, {
            log: this.logger,
            name: config.name,
        })
    }


    public get version(): string { return this.server.version }
    public set version(version) { this.server.version = version }

    public get name(): string { return this.server.name }
    public set name(name) { this.server.name = name }

    private toBootstrap: Array<() => void> = [];
    public onBootstrap(fn: (server: IHttpServer, cb: (err: Error, res: any) => void) => void): Promise<any> {
        return new Promise((resolve, reject) => {
            this.toBootstrap.push(() => {
                return fn(this, (err, result) => err ? reject(err) : resolve(result))
            })
        })
    }


    private middleware: Array<[RequestHandler, number]> = [];
    public registerMiddleware(handler: RequestHandler, sort = Infinity) {
        this.middleware.push([handler, sort]);
        this.middleware.sort((a, b) => {
            if (a[1] < b[1]) return -1;
            if (a[1] > b[1]) return 1;
            return 0
        })
    }

    public async listen(): Promise<void> {
        for (let fn of this.toBootstrap) {
            await fn()
        }

        const middleware = this.middleware;
        this.server = <InternalServer> this.router
            .setConfig((app: Server) => {
                app.pre((req: IReq, res: Response, next: Next) => {
                    req.start = Date.now();
                    req.log.info({ start: req.start, url: req.url, method: req.method }, 'server before')
                    next()
                });

                app.use(plugins.bodyParser());
                app.use(plugins.requestLogger())
                for (let [handler] of middleware) {
                    app.pre(handler)
                }
            })
            .build();


        this.server.on('after', (req: IReq, res: IRes, route: string, err: Error) => {
            err && err.name !== 'BadRequestError' && this.logger.error(err);
            req.log.info({ status: res.statusCode, end: Date.now() - (+req.start)}, 'server after')
        });

        this.server.on('uncaughtEception', (req: IReq, res: IRes, route: string, err: Error) => {
            this.logger.fatal(`route=${route}`, err);
            process.exit(1)
        });

        this.server.on('unhandledRejection', (req: IReq, res: IRes, route: string, err: Error) => {
            this.logger.fatal(`route=${route}`, err);
            process.exit(1)
        });

        this.server.on('InternalServer', (req: IReq, res: IRes, err: any, cb: Function) => {
            this.logger.error(err);

            // TODO: remove from prod
            const page = `
            <h1>sorry, this is broken right now... try again later?</h1>


            ${true ? `<div style="background: #feeeee">
                <pre>${err.stack}</pre>
              </div>` : ''}
            `;

            res.writeHead(500);
            if (req.method === 'GET') {
                res.end(page)
            }
            cb()
        });

        this.server.on('BadRequest', (req: any, res: any, err: any, cb: Function) => {
            if (err.jse_cause) {
                err.body.message = JSON.stringify({errors: err.jse_cause.errors})
            }
            cb()
        });

        this.server.on('NotFound', (req: any, res: any, err: any, cb: Function) => {
            const page = `
            <h1>404</h1>
            `;

            res.writeHead(404);
            res.end(page);
            cb();
        });

        this.server.listen(this.port, () => this.logger.info(`${this.name} listening on ${this.port}`))
    }

    public close(callback: Function): void {
        this.server.close(callback)
    }
}

export default HTTPServer
