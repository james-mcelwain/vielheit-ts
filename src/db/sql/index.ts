import {QueryFile} from "pg-promise";
import * as path from "path";

export class SQL_Helper {
    public static readFile(file: string) {
        const fullPath: string = path.join('../src/db/sql', `${file}.sql`);

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
        create: SQL_Helper.readFile('users/create'),
        empty: SQL_Helper.readFile('users/empty'),
        init: SQL_Helper.readFile('users/init'),
        drop: SQL_Helper.readFile('users/drop'),
        add: SQL_Helper.readFile('users/add'),
        updatePassword: SQL_Helper.readFile('users/update-password'),
        createUsersView: SQL_Helper.readFile('users/users-view'),
        remove: SQL_Helper.readFile('users/remove'),
    },
    posts: {
        create: SQL_Helper.readFile('posts/create')
    }
}