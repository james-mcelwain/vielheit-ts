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
@Controller('/')
class HomeController implements IController {
    private logger: ILogger;

    constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    /**
     @Get('/')
     private async index(req: IReq, res: IRes, next: Next) {
        try {
            const index = await readFileA(join('.', 'src/public/index.html'));
            res.writeHead(200);
            res.end(index);
            next()
        } catch (e) {
            next (new InternalServerError(e))
        }
    }
     */

    @Get('/public/js/bundle.js')
    private async bundle(req: IReq, res: IRes, next: Next) {
        try {
            const bundle = await readFileA(join('.', 'dist/bundle.js'), 'utf8');
            res.writeHead(200);
            res.end(bundle);
            next()
        } catch (e) {
            next(new InternalServerError(e))
        }
    }
}

export default HomeController