import {injectable, inject} from "inversify";
import {createClient, RedisClient} from "redis";
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
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err);
                    return
                }

                const str = <string> value;
                resolve(str)
            })
        })
    }

    public async set(key: string, value: string): Promise<boolean> {
        const time = Date.now();
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err, value) => {
                if (err) {
                    reject(err);
                    return
                }

                this.logger.info(`key=${key} time=${Date.now() - time}`);
                resolve(true)
            })
        })
    }
}

export default CacheService