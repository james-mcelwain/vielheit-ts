import {Next} from "restify";
import {BadRequestError} from "restify-errors";
import {Post, Get, Controller} from "inversify-restify-utils";
import {injectable, inject} from "inversify";
import {IDatabase} from "pg-promise";
import __, {API_BASE} from "../config/constants";
import Validate from "../validate";
import {IExtensions} from "../db/index";
import IController from "../interfaces/controller";
import IUserService from "../interfaces/user-service";
import ILogger from "../interfaces/logger";
import ILoggerFactory from "../interfaces/logger-factory";
import IRes from "../interfaces/res";
import IReq from "../interfaces/req";

@injectable()
@Controller(`${API_BASE}/users`)
class UsersController implements IController {
    @inject(__.UserService) userService: IUserService;
    @inject(__.Database) db: IDatabase<IExtensions>&IExtensions;
    private logger: ILogger;


    constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    @Get('/')
    private async get(req: IReq, res: IRes, next: Next) {
        const users = await this.userService.getAll();
        return users;
    }

    @Validate
    @Post('/add')
    private async create(req: IReq, res: IRes, next: Next) {
        const id = await this.userService.add(req.body);
        const user = await this.userService.findById(id);
        res.send(200, user);
        return next()
    }

    @Post('/empty')
    private async empty(req: IReq, res: IRes, next: Next) {
        await this.userService.empty();
        res.send(200);
        return next();
    }

    @Validate
    @Post('/authenticate')
    private async authenticate(req: IReq, res: IRes, next: Next) {
        const user = await this.userService.findByEmail(req.body.email)
        if (!user) {
            return next(new BadRequestError('User not found'))
        }

        const session = await this.userService.authenticate(req.body.password, user);
        res.send({id_token: session});
        return next()
    }
}

export default UsersController
