import { IDatabase } from 'pg-promise'

interface IDatabaseProvider {
    getDatabase: () => IDatabase
}

export default IDatabaseProvider