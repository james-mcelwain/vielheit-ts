import {inject, injectable} from 'inversify'
import {IApp, IHTTPServer, ILoggerFactory} from '../interfaces'
import __ from '../config/app-constants'


@injectable()
class App implements IApp {
    @inject(__.HTTPServer) httpServer: IHTTPServer;
    @inject(__.LoggerFactory) loggerFactory: ILoggerFactory;
    @inject(__.UserService) userService;

    public async bootstrap() {
        this.loggerFactory.getLogger(this).info('starting services');
        this.httpServer.onBootstrap(this.userService.onBootstrap.bind(this.userService));
        this.httpServer.listen()
    }

    public close() {
        this.httpServer.close(() => {
        })
    }
}

export default App