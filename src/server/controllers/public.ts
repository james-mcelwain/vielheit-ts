import {Next} from "restify";
import {InternalServerError} from "restify-errors";
import {Get, Controller} from "inversify-restify-utils";
import {injectable, inject} from "inversify";
import {join} from "path";
import {readFile} from "fs";
import {promisify} from "bluebird";
import IController from "../interfaces/controller";
import __ from "../config/constants";
import ILogger from "../interfaces/logger";
import ILoggerFactory from "../interfaces/logger-factory";
import IRes from "../interfaces/res";
import IReq from "../interfaces/req";

let readFileA = promisify(readFile);

@injectable()
@Controller('/public')
class PublicController implements IController {
    private logger: ILogger;

    constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    @Get('/js/client.js.map')
    private async sourcemaps(req: IReq, res: IRes, next: Next) {
        try {
            const sourcemaps = await readFileA(join('.', 'dist/client.js.map'));
            res.writeHead(200);
            res.end(sourcemaps);
            next();
        } catch(e) {
            next(new InternalServerError(e))
        }
    }

    @Get('/css/styles.css')
    private async styles(req: IReq, res: IRes, next: Next) {
        try {
            const styles = await readFileA(join('.', 'src/server/public/styles.css'));
            res.writeHead(200, { 'Cache-Control': 'no-cache', 'Content-Type': 'text/css' });
            res.end(styles);
            next()
        } catch (e) {
            next(new InternalServerError(e))
        }
    }

    @Get('/js/bundle.js')
    private async bundle(req: IReq, res: IRes, next: Next) {
        try {
            const bundle = await readFileA(join('.', 'dist/client.js'));
            res.writeHead(200);
            res.end(bundle);
            next()
        } catch (e) {
            next(new InternalServerError(e))
        }
    }
}

export default PublicController
