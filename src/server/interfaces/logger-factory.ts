import ILogger from "./logger";

interface ILoggerFactory {
    getLogger(_this: Object): ILogger 
}

export default ILoggerFactory