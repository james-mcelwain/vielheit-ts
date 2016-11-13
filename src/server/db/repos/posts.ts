import {IDatabase} from "pg-promise"
import sqlProvider from "../sql"

const posts = sqlProvider.posts;

export class Repository {
    private db: IDatabase<any>;

    constructor(db: IDatabase<any>) {
        this.db = db;
    }

    public async create() {
        return this.db.none(posts.create)
    }
}