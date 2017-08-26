import { injectable, inject } from "inversify";
import * as redis from "redis";
import { createClient, RedisClient } from "redis";
import { promisify } from "bluebird";
import __ from "../config/constants";
import ILoggerFactory from "../interfaces/logger-factory";
import ILogger from "../interfaces/logger";
import ICacheService from "../interfaces/cache-service";
import * as bluebird from "bluebird";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

declare var process: any;

@injectable()
class CacheService implements ICacheService {
    private client: AsyncRedisClient;
    private logger: ILogger;

    public constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this);
    }

    public async onBootstrap() {
        return new Promise((resolve, reject) => {
            this.logger.info('connecting to redis');
            this.client = createClient() as AsyncRedisClient;

            setTimeout(() => {
                reject('failed to connect to redis in 2s')
            }, 2000);

            this.client.on('connect', () => {
                this.logger.info('connected');
                resolve(true)
            });

            this.client.on('err', (err: Error) => {
                this.logger.error(err);
                reject(false)
            });

            this.client.on('reconnecting', (err: Error) =>
                this.logger.info(`reconnecting ${err ? 'err=' + err : ''}`));
        })
    }

    public async get(key: string): Promise<string> {
        const time = Date.now();

        return this.client.getAsync(key)
            .then(r => {
                this.logger.info(`key=${key} time=${Date.now() - time} action=get`);
                return r
            })
    }

    public async del(key: string): Promise<boolean> {
        const time = Date.now();

        return this.client.delAsync(key)
            .then(r => {
                this.logger.info(`key=${key} time=${Date.now() - time} action=del`);
                return r
            })
    }

    public async set(key: string, value: string): Promise<boolean> {
        const time = Date.now();

        return this.set(key, value)
            .then(r => {

                this.logger.info(`key=${key} time=${Date.now() - time} action=set`);
                return r
            })
    }
}

interface AsyncRedisClient extends RedisClient {
    getAsync(key: string): Promise<string>
    delAsync(key: string): Promise<boolean>
    setAsync(key: string, value: string): Promise<'OK'>
}

export default CacheService