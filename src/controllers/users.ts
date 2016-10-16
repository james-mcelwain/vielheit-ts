import { Request, Response, Next } from 'restify'
import { InternalServerError, BadRequestError } from 'restify-errors'
import { Post, Get, Controller } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify'
import { IDatabase } from 'pg-promise'
import { IController, ILogger, ILoggerFactory, IUserService } from '../interfaces'
import { API_BASE } from '../config/app-constants'
import __ from '../config/app-constants'

@injectable()
@Controller(`${API_BASE}/users`)
class UsersController implements IController {
  @inject(__.UserService) userService: IUserService;
  @inject(__.Database) db: IDatabase;
  private logger: ILogger;

  constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
    this.logger = LoggerFactory.getLogger(this)
  }

  @Get('/create')
  private async create(req: Request, res: Response, next: Next) {
    try {
      await this.db.users.create();
      res.send(200);
      return next()
    } catch (e) {
      next(new InternalServerError(e))
    }
  }

  @Get('/init')
  private async init(req: Request, res: Response, next: Next) {
    try {
      await this.db.users.init();
      res.send(200);
      return next()
    } catch (e) {
      next(new InternalServerError(e))
    }
  }

  @Get('/empty')
  private async empty(req: Request, res: Response, next: Next) {
    try {
      await this.db.users.empty();
      res.send(200);
      return next()
    } catch (e) {
      next(new InternalServerError(e))
    }
  }

  @Validate
  @Post('/authenticate')
  private async authenticate(req: Request, res: Response, next: Next) {
    try {
      const valid = await this.userService.authenticate(+req.body.id, req.body.password);
      res.send(valid);
      return next()
    } catch (e) {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError(e))
      }

      next(new InternalServerError(e))
    }
  }
}

export default UsersController