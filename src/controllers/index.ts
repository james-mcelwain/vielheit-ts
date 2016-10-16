import { Request, Response, Next } from 'restify'
import { InternalServerError }  from 'restify-errors'
import { Get, Controller } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify'
import IController from '../interfaces/controller'
import __ from '../config/app-constants'
import { ILogger } from '../interfaces'

import * as error from 'restify-errors'
import { join } from 'path'
import { readFile } from 'fs'
import { promisify } from 'bluebird'

let rFile = promisify(readFile);

@injectable()
@Controller('/')
class HomeController implements IController {
    private logger: ILogger;

    constructor( @inject(__.LoggerFactory) LoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    @Get('/')
    private async index(req: Request, res: Response, next: Next) {
        try {
            const index = await rFile(join('.', 'src/server/public/index.html'));
            res.writeHead(200);
            res.end(index);
            next()
        } catch (e) {
            next (new InternalServerError(e))
        }
    }

    @Get('/public/bundle.js')
    private async bundle(req: Request, res: Response, next: Next) {
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