import {injectable} from 'inversify'
import * as promise from 'bluebird'
import * as pgPromise from 'pg-promise'

import {Repository as UsersRepository} from '../db/repos/users'

declare const process = {
    env: Object
};

export interface IExtensions {
    users: UsersRepository,
}


import IDatabaseProvider from '../interfaces/database-provider'

@injectable()
class DatabaseProvider implements IDatabaseProvider {

    private static options: Object = {
        promiseLib: promise,
        extend: (obj: any) => {
            obj.users = new UsersRepository(obj, DatabaseProvider.pgp)
        }
    };

    private static config: Object = {
        host: 'localhost',
        port: 5432,
        database: process.env.PG_DATABASE || 'vielheit',
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || 'postgres'
    };

    private static pgp = pgPromise(DatabaseProvider.options);
    private static pg = DatabaseProvider.pgp(DatabaseProvider.config);

    private Postgres: pgPromise.IMain;
    private db: pgPromise.IDatabase;

    public constructor() {
        const options = {
            promiseLib: promise,
            extend: (obj: any) => {
                obj.users = new UsersRepository(obj, this.Postgres)
            }
        }
    }

    public getDatabase() {
        return this.db;
    }
}

export default DatabaseProvider