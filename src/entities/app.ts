import { inject, injectable } from 'inversify'
import {
    IApp, IHTTPServer, ILoggerFactory, ILogger,
    IUserService, ICacheService
} from '../interfaces'
import __ from '../config/app-constants'
import { Logger } from "bunyan";


@injectable()
class App implements IApp {
    @inject(__.HTTPServer) httpServer: IHTTPServer;
    @inject(__.UserService) userService: IUserService;
    @inject(__.CacheService) cache: ICacheService;

    public logger: ILogger;

    public constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this);
    }

    public async bootstrap(): Promise<Boolean> {
        this.logger.info('starting services');
        try {
            this.httpServer.onBootstrap(this.userService.onBootstrap.bind(this.userService));
            this.httpServer.onBootstrap(this.cache.onBootstrap.bind(this.cache))
        } catch (e) {
            this.logger.fatal(e)
            process.exit(1)
        }
        this.httpServer.listen();
        return true
    }

    public close() {
        this.httpServer.close(() => {
        })
    }
}

export default App