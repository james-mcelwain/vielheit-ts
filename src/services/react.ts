import {injectable, inject} from "inversify";
import __ from "../config/constants";
import ILoggerFactory from "../interfaces/logger-factory";
import ILogger from "../interfaces/logger";
import {Request, Response, Next} from "restify";
import IHTTPServer from "../interfaces/http-server";

@injectable()
class IsomorphicReactService {
    private logger: ILogger
    @inject(__.HTTPServer) httpServer: IHTTPServer;

    public constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    public async onBootstrap() {
        console.log('called!')
        this.httpServer.registerMiddleware((req: Request, res: Response, next: Next) => {
            console.log('OKOKOK')
            console.log(1)
            next()
        });
    }
}

export default IsomorphicReactService;