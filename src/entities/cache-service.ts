import { injectable, inject } from 'inversify'
import { createClient, RedisClient } from 'redis'
import { promisify } from 'bluebird'

import { ICacheService, ILoggerFactory, ILogger } from '../interfaces'
import __ from '../config/app-constants'

@injectable()
class CacheService implements ICacheService {
    private client: RedisClient;
    private logger: ILogger;

    public constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this);

    }

    public async onBootstrap() {
        return new Promise((resolve, reject) => {
            this.logger.info('connecting to redis')
            this.client = createClient()

            this.client.on('ready', () => {
                this.logger.info('connected')
                resolve(true)
            })
            this.client.on('err', (err: Error) => {
                this.logger.error(err)
                reject(false)
            })
            this.client.on('reconnecting', (err: Error) => this.logger.info(`reconnecting ${err ? 'err=' + err : ''}`))
        })

    }

    public async get(key: string) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(value)
            })
        })
    }

    public async set(key: string, value: string) {
        const time = Date.now()
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err, value) => {
                if (err) {
                    reject(err)
                    return
                }

                this.logger.info(`key=${key} time=${Date.now() - time}`)
                resolve(value)
            })
        })
    }
}

export default CacheService