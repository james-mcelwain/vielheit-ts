import {IDatabase} from 'pg-promise'
import {injectable, inject} from 'inversify'
import {hash, compare} from 'bcrypt'
import {Validator} from 'validator.ts/Validator'
import {IsLength, IsEmail} from 'validator.ts/decorator/Validation'
import promisify from 'bluebird'

import IUserService from '../interfaces/user-service'
import ILogger from '../interfaces/logger'
import __ from '../config/app-constants'
import {IExtensions} from '../db'


const SALT_WORK_FACTOR = 15;

@injectable()
class UserService implements IUserService {
    @inject(__.Database) db: IDatabase<IExtensions>&IExtensions;
    private logger: ILogger;

    constructor(@inject(__.LoggerFactory) LoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    public async onBootstrap() {
        this.logger.info('create users table');
        return this.db.users.create()
    }

    public async createUser(req: IUser) {
        const user = new User();
        user.username = req.username;
        user.email = req.email;
        user.password = req.password;
        user.fname = req.fname;
        user.lname = req.lname;

        const validator = new Validator();
        const errors = validator.validateOrThrow(user);

        const emailExists = await this.db.users.findEmail(user.email);
        if (emailExists) {
            throw new Error('Email already exists')
        }

        await this.db.users.add(user)
    }

    public async updatePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = await this.db.users.find(userId);
        const passwordHash = user.password;
        const candidateHash = await promisify(hash)(oldPassword, SALT_WORK_FACTOR);
        const valid = await  promisify(compare)(candidateHash, passwordHash);
        if (valid) {
            return this.db.users.updatePassword(newPassword, userId)
        }

        return Promise.reject(new Error())
    }

    public async authenticate(userId: number, password: string) {
        const user = await this.db.users.find(userId);
        const passwordHash = user.password;
        const candidateHash = await hash(password, SALT_WORK_FACTOR);
        const valid = await promisify(compare)(candidateHash, passwordHash);
        this.logger.fatal(valid);
        return valid
    }

}

export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string,
    fname: string,
    lname: string,
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