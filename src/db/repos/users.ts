import {IDatabase, IMain} from 'pg-promise'
import sqlProvider from '../sql'

const sql = sqlProvider.users;

export class Repository {
    private db: IDatabase<any>;

    constructor(db: any) {
        this.db = db;
    }

    public async create() {
        return this.db.none(sql.create)
    }

    public async init() {
        return this.db.tx('Init-Users', (t: any) => t.map(sql.init, null, (row: any) => row.id))
    }

    public async drop() {
        return this.db.none(sql.drop)
    }

    public async empty() {
        return this.db.none(sql.empty)
    }

    public async add(user: Object) {
        return this.db.one(sql.add, user, (u: any) => u.id)
    }

    public async remove(id: number) {
        return this.db.result('DELETE FROM Users WHERE ID = $1', id, (r: any) => r.rowcount)
    }

    public async find(id: number) {
        return this.db.oneOrNone('SELECT * FROM Users WHERE id = $1', id)
    }

    public async findByEmail(email: String) {
        return this.db.oneOrNone('SELECT * FROM Users WHERE email = $1', email)
    }

    public async all() {
        return this.db.any('SELECT * FROM Users')
    }

    public async total() {
        return this.db.one('SELECT count(*) FROM Users', [], (a: any) => +a.count)
    }

    public async updatePassword(password: string, id: number) {
        return this.db.oneOrNone(sql.updatePassword, [password, id], (u: any) => u.id)
    }

}