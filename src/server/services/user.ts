import {IDatabase} from "pg-promise";
import {injectable, inject} from "inversify";
import {hash, compare} from "bcrypt";
import {Validator} from "validator.ts/Validator";
import {promisify} from "bluebird";
import __ from "config/constants";
import {IExtensions} from "db";
import ISessionService from "interfaces/session-service";
import IUserService from "interfaces/user-service";
import ILogger from "interfaces/logger";
import ILoggerFactory from "interfaces/logger-factory";
import IUser from "interfaces/user";
import {IAddUserReq} from "../../domain/request/user";
import User from "../../domain/impl/user";
import ISerializeableUser from "../../domain/user";

const SALT_WORK_FACTOR = 10;
const hashAsync = promisify(hash);
const compareAsync = promisify(compare);

@injectable()
class UserService implements IUserService {
    @inject(__.Database) db: IDatabase<IExtensions> & IExtensions;
    @inject(__.SessionService) session: ISessionService;
    private logger: ILogger;

    public constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    public async onBootstrap() {
        this.logger.info('create users table');
        await this.db.users.create();
        this.logger.info('create users view');
        await this.db.users.createUsersView();
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return this.db.users.findByEmail(email);
    }

    public async findById(id: string): Promise<IUser | null> {
        return this.db.users.find(+id);
    }

    public async getAll(): Promise<Array<IUser>> {
        return this.db.users.all()
    }

    public async add(req: IAddUserReq): Promise<number> {
        const userExists = await this.findByEmail(req.email);
        if (userExists) {
            throw new Error('Email already exists')
        }

        req.password = await hashAsync(req.password, SALT_WORK_FACTOR);
        return await this.db.users.add(req);
    }

    public async updatePassword(userId: number, oldPassword: string, newPassword: string) {
        const passwordHash = await this.db.users.findPasswordHashById(userId);
        const candidateHash = await hashAsync(oldPassword, SALT_WORK_FACTOR);
        const valid = await compareAsync(candidateHash, passwordHash);
        if (valid) {
            return this.db.users.updatePassword(newPassword, userId)
        }

        return Promise.reject(new Error())
    }

    public async authenticate(candidate: string, _user: ISerializeableUser): Promise<string> {
        const user = new User(_user);

        const password  = await this.db.users.findPasswordHashById(+user.id);
        if (!hash) {
            return Promise.reject(new Error('User not found'))
        }
        const auth = await compareAsync(candidate, password);
        return await this.session.setSession(user);
    }

    public async empty() {
        return this.db.users.empty()
    }
}

export default UserService