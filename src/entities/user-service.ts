import { IDatabase } from 'pg-promise'
import { injectable, inject } from 'inversify'
import { hash, compare } from 'bcrypt'
import { Validator } from 'validator.ts/Validator'
import { IsLength, IsEmail, IsNumeric } from 'validator.ts/decorator/Validation'
import { promisify } from 'bluebird'

import {
    ILoggerFactory, ILogger, IUserService,
    IUser, ISessionService
} from '../interfaces'
import __ from '../config/constants'
import { IExtensions } from '../db'

const validator = new Validator();
const SALT_WORK_FACTOR = 10;
const hashAsync = promisify(hash)
const compareAsync = promisify(compare)


@injectable()
class UserService implements IUserService {
    @inject(__.Database) db: IDatabase<IExtensions> & IExtensions;
    @inject(__.SessionService) session: ISessionService;
    private logger: ILogger;

    public constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    public async onBootstrap() {
        this.logger.info('create users table');
        await this.db.users.create();
        this.logger.info('create users view')
        await this.db.users.createUsersView();
    }

    public async findByEmail(email: string) {
        return this.db.users.findByEmail(email);
    }

    public async findById(id: number | string) {
        return this.db.users.find(+id);
    }

    public async getAll() {
        return this.db.users.all()
    }

    public async add(req: IUser): Promise<number> {
        const emailExists = await this.db.users.findByEmail(req.email);
        if (emailExists) {
            throw new Error('Email already exists')
        }

        req.password = await hashAsync(req.password, SALT_WORK_FACTOR)

        const id = await this.db.users.add(req)
        return id
    }

    public async updatePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = <IUser> await this.db.users.find(userId);
        const passwordHash = user.password;
        const candidateHash = await hashAsync(oldPassword, SALT_WORK_FACTOR);
        const valid = await compareAsync(candidateHash, passwordHash);
        if (valid) {
            return this.db.users.updatePassword(newPassword, userId)
        }

        return Promise.reject(new Error())
    }

    public async authenticate(candidate: string, user: IUser): Promise<string> {
        const { password }  = await this.db.users.findPasswordHashById(+user.id);
        if (!hash) {
            return Promise.reject(new Error('User not found'))
        }
        const auth = await compareAsync(candidate, password);
        const session = await this.session.setSession(user);
        return session
    }

    public async empty() {
        return this.db.users.empty()
    }
}

class ValidateUserReq {
    @IsNumeric()
    _id: string
    set id(id: number) {
        this._id = id + ''
    }

    @IsLength(6, 20)
    password: string
}

export class User {
    @IsLength(6, 20)
    username: string;

    @IsEmail()
    email: string;

    @IsLength(6, 20)
    password: string;

    @IsLength(3, 20)
    fname: string;

    @IsLength(3, 20)
    lname: string;
}

export default UserService