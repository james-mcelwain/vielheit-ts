import {injectable, inject} from "inversify";
import {createClient, RedisClient} from "redis";
import {promisify} from "bluebird";
import __ from "../config/constants";
import ILoggerFactory from "../interfaces/logger-factory";
import ILogger from "../interfaces/logger";
import ICacheService from "../interfaces/cache-service";

declare var process:any;

@injectable()
class CacheService implements ICacheService{
    private client: RedisClient;
    private logger: ILogger;

    public constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this);
    }

    public async onBootstrap() {
        return new Promise((resolve, reject) => {
            this.logger.info('connecting to redis');
            this.client = createClient();

            setTimeout(() => {
                reject('failed to connect to redis in 2s')
            }, 2000);

            Reflect.get(this.client, 'on').call(this.client, 'connect', () => {
                this.logger.info('connected');
                resolve(true)
            });
            Reflect.get(this.client, 'on').call(this.client, 'err', (err: Error) => {
                this.logger.error(err);
                reject(false)
            });
            Reflect.get(this.client, 'on').call(this.client, 'reconnecting', (err: Error) =>
                this.logger.info(`reconnecting ${err ? 'err=' + err : ''}`));
        })
    }

    public async get(key: string): Promise<string> {
    const time = Date.now();
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) return reject(err);

                const str = <string> value;
                this.logger.info(`key=${key} time=${Date.now() - time} action=get`);
                resolve(str)
            })
        })
    }

    public async del(key: string): Promise<boolean> {
        const time = Date.now();
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) return reject(err);

                this.logger.info(`key=${key} time=${Date.now() - time} action=del`);
                resolve(true)
            })
        })
    }

    public async set(key: string, value: string): Promise<boolean> {
        const time = Date.now();
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err, value) => {
                if (err) return reject(err);

                this.logger.info(`key=${key} time=${Date.now() - time} action=set`);
                resolve(true)
            })
        })
    }
}

export default CacheService