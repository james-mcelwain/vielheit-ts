import {injectable} from "inversify";
import * as promise from "bluebird";
import * as pgPromise from "pg-promise";
import {Repository as UsersRepository} from "../db/repos/users";
import IDatabaseProvider from "../interfaces/database-provider";

export interface IExtensions {
    users: UsersRepository,
}

declare type process = {
    env: any
}

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

        const config = {
            host: 'localhost',
            port: 5432,
            database: process.env.PG_DATABASE || 'vielheit',
            user: process.env.PG_USER || 'postgres',
            password: process.env.PG_PASSWORD || 'postgres'
        };

        const pgp: pgPromise.IMain = pgPromise<IExtensions>(options);
        this.db = <pgPromise.IDatabase<IExtensions>&IExtensions> pgp(config); // gross type cast
    }

    public getDatabase() {
        return this.db;
    }
}

export default DatabaseProvider