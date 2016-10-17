import { createServer, Server, RequestHandler, CORS, bodyParser } from 'restify'
import { InversifyRestifyServer, TYPE } from 'inversify-restify-utils'
import kernel from '../config/di-config'
import { inject, injectable } from 'inversify'
import { ILogger, ILoggerFactory, IReq, IRes } from '../interfaces'
import __ from '../config/app-constants'
import IHttpServer from '../interfaces/http-server'
import { v4 as uuid } from 'node-uuid'

@injectable()
class HTTPServer implements IHttpServer {
    private server: Server;
    private port: number;
    private router: InversifyRestifyServer;
    @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory;
    public logger: ILogger;

    public constructor(
        port: number = 8080,
        name: string = '',
        version: string = ''
    ) {
        this.port = port;
        this.router = new InversifyRestifyServer(kernel)
    }


    public get version(): string { return this.server.version }
    public set version(version) { this.server.version = version }

    public get name(): string { return this.server.name }
    public set name(name) { this.server.name = name }

    private toBootstrap: Array<() => void> = [];
    public onBootstrap(fn: (cb: (err: Error, res: any) => void) => void): Promise<any> {
        return new Promise((resolve, reject) => {
            this.toBootstrap.push(() => {
                return fn((err, result) => err ? reject(err) : resolve(result))
            })
        })
    }

    public listen(): void {
        this.logger = this.LoggerFactory.getLogger(this);

        this.toBootstrap.forEach((fn) => {
            fn()
        });

        this.server = this.router
            .setConfig((app) => {
                app.use((req: IReq, res: IRes, next: Function) => {
                    req.start = Date.now()
                    req.uuid = uuid()
                    this.logger.info(`| ${req.uuid} | method=${req.method} url=${req.url}`)
                    next()                    
                })
                
                app.use(CORS())
                app.use(bodyParser())
            })
            .build();


        this.server.on('after', (req: IReq, res: IRes, route: string, err: Error) => {
            err && err.name !== 'BadRequestError' && this.logger.error(err);
            this.logger.info(`| ${req.uuid} | url=${req.url} status=${res.statusCode} time=${Date.now() - req.start }`)
        });

        this.server.on('uncaughtEception', (req: IReq, res: IRes, route: string, err: Error) => {
            this.logger.fatal(`route=${route}`, err);
            process.exit(1)
        });

        this.server.on('unhandledRejection', (req: IReq, res: IRes, route: string, err: Error) => {
            this.logger.fatal(`route=${route}`, err);
            process.exit(1)
        });

        this.server.on('InternalServer', (req: IReq, res: IRes, err: Error, cb: Function) => {
            this.logger.error(err);
            console.log(req.body)


            // TODO
            const page = `
            <h1>sorry, this is broken right now... try again later?</h1>

            ${true ? `<div style="background: #feeeee">
                <pre>${err}</pre>
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
            req.uuid = uuid()
            req.start = Date.now()
            
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
