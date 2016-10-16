import {inject, injectable} from 'inversify'
import {IApp, IHTTPServer, ILoggerFactory, ILogger} from '../interfaces'
import __ from '../config/app-constants'
import {Logger} from "bunyan";


@injectable()
class App implements IApp {
    @inject(__.HTTPServer) httpServer: IHTTPServer;
    @inject(__.UserService) userService;

    public logger: ILogger;

    public constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this);
    }

    public async bootstrap(): Promise<Boolean> {
        this.logger.info('starting services');
        this.httpServer.onBootstrap(this.userService.onBootstrap.bind(this.userService));
        this.httpServer.listen();
        return true
    }

    public close() {
        this.httpServer.close(() => {
        })
    }
}

export default App