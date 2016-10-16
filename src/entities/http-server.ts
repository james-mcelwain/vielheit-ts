import { createServer, Server, RequestHandler } from 'restify'
import { InversifyRestifyServer, TYPE } from 'inversify-restify-utils'
import kernel from '../config/di-config'
import { inject, injectable } from 'inversify'
import { ILogger } from '../interfaces'
import __ from '../config/app-constants'
import IHttpServer from '../interfaces/http-server'
import { bodyParser } from 'restify'
import { v4 as uuid } from 'node-uuid'

@injectable()
class HTTPServer implements IHttpServer {
    private server: Server;
    private port: number;
    private router;
    @inject(__.LoggerFactory) LoggerFactory;
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
                app.use((req, res, next) => {
                    req.start = Date.now()
                    req.uuid = uuid()
                    this.logger.info(`| ${req.uuid} | method=${req.method} url=${req.url}`)
                    next()                    
                })
                app.use(bodyParser())
            })
            .build();


        this.server.on('after', (req, res, route, err) => {
            if (err) this.logger.error(err);
            this.logger.info(`| ${req.uuid} | url=${req.url} status=${res.statusCode} time=${Date.now() - req.start }`)
        });

        this.server.on('uncaughtEception', (req, res, route, err) => {
            this.logger.fatal(`route=${route}`, err);
            process.exit(1)
        });

        this.server.on('unhandledRejection', (req, res, route, err) => {
            this.logger.fatal(`route=${route}`, err);
            process.exit(1)
        });

        this.server.on('InternalServer', (req, res, err, cb) => {
            this.logger.error(err);


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
            this.logger.warn(`| ${req.uuid} | method=${req.method} url=${req.url} status=${400} error=${err}`);

            if (err.jse_cause) {
                res.end(JSON.stringify({ errors: err.js_cause.errors }))
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

    public close(callback): void {
        this.server.close(callback)
    }
}

export default HTTPServer
