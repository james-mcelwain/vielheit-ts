import { Next } from 'restify'
import { InternalServerError }  from 'restify-errors'
import { Get, Controller } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify'
import { join } from 'path'
import { readFile } from 'fs'
import { promisify } from 'bluebird'

import IController from '../interfaces/controller'
import __ from '../config/constants'
import { ILogger, IReq, IRes, ILoggerFactory } from '../interfaces'

let rFile = promisify(readFile);

@injectable()
@Controller('/')
class HomeController implements IController {
    private logger: ILogger;

    constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    @Get('/')
    private async index(req: IReq, res: IRes, next: Next) {
        try {
            const index = await rFile(join('.', 'src/index.html'));
            res.writeHead(200);
            res.end(index);
            next()
        } catch (e) {
            next (new InternalServerError(e))
        }
    }

    @Get('/public/bundle.js')
    private async bundle(req: IReq, res: IRes, next: Next) {
        try {

            const bundle = await rFile(join('.', 'dist/bundle.js'));
            res.writeHead(200);
            res.end(bundle);
            next()

        } catch (e) {
            next(new InternalServerError(e))
        }
    }
}

export default HomeController