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
        prmiseLib: promise,
        extend: (obj: any) => {
            obj.users = new UsersRepository(obj, DatabaseProvider.pgp)
        }
    }

    private static config: Object = {
        host: 'localhost',
        port: 5432,
        database: process.env.PG_DATABASE|| 'vielheit',
        user:  process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || 'postgres'
    }

    private static pgp = pgPromise(DatabaseProvider.options)
    private static pg = DatabaseProvider.pgp(DatabaseProvider.config)

    public getPgp() {
        return DatabaseProvider.pgp
    }

    public getDatabase() {
        return DatabaseProvider.pg
    }
}

export default DatabaseProvider