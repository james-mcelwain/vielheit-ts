import {injectable} from 'inversify'
import * as promise from 'bluebird'
import * as pgPromise from 'pg-promise'

import {Repository as UsersRepository} from '../db/repos/users'

export interface IExtensions {
    users: UsersRepository,
}


import IDatabaseProvider from '../interfaces/database-provider'

@injectable()
class DatabaseProvider implements IDatabaseProvider {
    private db: pgPromise.IDatabase<IExtensions>&IExtensions;

    public constructor() {
        const options = {
            promiseLib: promise,
            extend: (obj: any) => {
                obj.users = new UsersRepository(obj)
            }
        };

        const config: pgPromise.IConfig = {
            host: 'localhost',
            port: 5432,
            database: process.env.PG_DATABASE || 'vielheit',
            user: process.env.PG_USER || 'postgres',
            password: process.env.PG_PASSWORD || 'postgres'
        };

        this.db = <IExtensions> pgPromise(options)(config);
    }

    public getDatabase() {
        return this.db;
    }
}

export default DatabaseProvider