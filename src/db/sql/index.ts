import {QueryFile} from 'pg-promise'
import * as path from 'path'

declare var __dirname: string;

export class SQL_Helper {
    public static readFile(file: string) {
        const fullPath: string = path.join('../src/server/db/sql', file);

        const options = {
            minify: true,
            params: {
                schema: 'public'
            },
        };


        return new QueryFile(fullPath, options)
    }
}

export default {
    users: {
        create: SQL_Helper.readFile('users/create.sql'),
        empty: SQL_Helper.readFile('users/empty.sql'),
        init: SQL_Helper.readFile('users/init.sql'),
        drop: SQL_Helper.readFile('users/drop.sql'),
        add: SQL_Helper.readFile('users/add.sql'),
        updatePassword: SQL_Helper.readFile('users/update-password'),
    },
}