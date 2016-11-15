import {injectable, inject} from "inversify";
import {sign, verify} from "jsonwebtoken";
import {readFileSync} from "fs";
import * as path from "path";
import {v4 as uuid} from "node-uuid";
import __ from "../config/constants";
import ISessionService from "../interfaces/session-service";
import ICacheService from "../interfaces/cache-service";
import ILogger from "../interfaces/logger";
import ILoggerFactory from "../interfaces/logger-factory";
import IUser from "../interfaces/user";

declare var process:any;

const KEY_FILE = path.resolve(process.cwd(), 'keys');

// TODO: CHANGE KEYS
const PRIVATE_KEY = readFileSync(`${KEY_FILE}/privkey.pem`);
const PUBLIC_KEY = readFileSync(`${KEY_FILE}/pubkey.pem`);

@injectable()
class SessionService implements ISessionService {
    @inject(__.CacheService) cache: ICacheService;
    private logger: ILogger;

    public constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }

    public async getSession(token: string): Promise<string> {
        const p: Promise<string> = new Promise((resolve, reject) => {
            verify(token, PUBLIC_KEY, (err: Error, decoded: string) => {
                if (err) {
                    reject(err);
                    return
                }

                resolve(decoded)
            })
        });

        return p
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