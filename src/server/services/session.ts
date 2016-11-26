import {injectable, inject} from "inversify";
import {sign, verify} from "jsonwebtoken";
import {readFileSync} from "fs";
import * as path from "path";
import {promisify} from "bluebird";
import {v4 as uuid} from "node-uuid";
import __ from "../config/constants";
import ISessionService from "../interfaces/session-service";
import ICacheService from "../interfaces/cache-service";
import ILogger from "../interfaces/logger";
import ILoggerFactory from "../interfaces/logger-factory";
import IUser from "../../domain/user";
import IReq from "../interfaces/req";
import IRes from "../interfaces/res";
import {Next} from "restify";
import User from "../../domain/impl/user";
import IHTTPServer from "../interfaces/http-server";

const verifyA = promisify(verify);

declare var process:any;

const KEY_FILE = path.resolve(process.cwd(), 'keys');

// TODO: CHANGE KEYS
const PRIVATE_KEY = readFileSync(`${KEY_FILE}/privkey.pem`);
const PUBLIC_KEY = readFileSync(`${KEY_FILE}/pubkey.pem`);

@injectable()
class SessionService implements ISessionService{
    @inject(__.CacheService) cache: ICacheService;
    private logger: ILogger;

    public constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    public async onBootstrap(server: IHTTPServer) {
        server.registerMiddleware(async (req: IReq, res: IRes, next: Next) => {
            if (req.header('Authorization')) {
                const token = await this.getSession(req.header('Authorization').slice(7));
                const session = await this.cache.get(Reflect.get(token, 'session-id'));
                this.logger.fatal(session);
                if (session) {
                    const user = <IUser> JSON.parse(session);
                    req.user = new User(user);
                } else {
                    this.logger.fatal('clear session');
                    res.header('clear-session', 'true');
                }
            }
            next()
        }, 0)
    }

    public async getSession(token: string): Promise<string> {
        try {
            return await verifyA(token, PUBLIC_KEY, { algorithm: 'RS256 '})
        } catch(e: Error) {
            this.logger.error(e)
        }
    }

    public async setSession(user: IUser): Promise<string> {
        const sessionId = uuid();
        const token = sign({ ['session-id']: sessionId }, PRIVATE_KEY, { algorithm: 'RS256' });
        await this.cache.set(sessionId, JSON.stringify(user));
        return token
    }

    public async clearSession() {

    }
}

export default SessionService