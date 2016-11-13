import {IDatabase} from "pg-promise";
import {IExtensions} from "../db/index";

interface IDatabaseProvider {
    getDatabase: () => IDatabase<IExtensions>&IExtensions;
}

export default IDatabaseProvider