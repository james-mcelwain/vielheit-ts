import {inject, injectable} from "inversify";
import __ from "../config/constants";
import IApp from "../interfaces/app";
import IHTTPServer from "../interfaces/http-server";
import IUserService from "../interfaces/user-service";
import ICacheService from "../interfaces/cache-service";
import ILogger from "../interfaces/logger";
import ILoggerFactory from "../interfaces/logger-factory";
import IIsomorphicReactService from "../interfaces/isomorphic-react-service";
import ISessionService from "../interfaces/session-service";

declare var process: any;

@injectable()
class App implements IApp {
    @inject(__.HTTPServer) httpServer: IHTTPServer;
    @inject(__.UserService) userService: IUserService;
    @inject(__.CacheService) cache: ICacheService;
    @inject(__.IsomorphicReactService) react: IIsomorphicReactService;
    @inject(__.SessionService) session: ISessionService;

    public logger: ILogger;

    public constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this);
    }

    public async bootstrap(): Promise<Boolean> {
        this.logger.info('starting services');
        try {
            this.httpServer.onBootstrap(this.userService.onBootstrap.bind(this.userService));
            this.httpServer.onBootstrap(this.cache.onBootstrap.bind(this.cache));
            this.httpServer.onBootstrap(this.react.onBootstrap.bind(this.react));
            this.httpServer.onBootstrap(this.session.onBootstrap.bind(this.session))
        } catch (e) {
            this.logger.fatal(e);
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