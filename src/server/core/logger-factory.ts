import {createLogger, LoggerOptions, stdSerializers as serializers} from "bunyan";
import {injectable}from "inversify";
import ILogger from "../interfaces/logger";

@injectable()
class LoggerFactory {
    private static makeDefaultConfig(): LoggerOptions {
        return { name: '', serializers }
    }
    
    private static makeConfig(name: string, options: LoggerOptions): LoggerOptions {
       options.name = name;
       return options
    }

    private static config: LoggerOptions = LoggerFactory.makeDefaultConfig();

    private static createLogger(name: string): ILogger {
        if (!LoggerFactory.loggers[name]) {
            const logger: ILogger = createLogger(LoggerFactory.makeConfig(name, LoggerFactory.config));
            LoggerFactory.loggers[name] = logger;
        }

        return LoggerFactory.loggers[name]
    }

    private static loggers: { [key: string]: ILogger } = {};

    public static getLogger(name: { new(...args: any[]): any; }): ILogger {
        const loggerName = name.constructor.toString().match(/class ([\w|_]+)/);

        if (loggerName) {
            return LoggerFactory.createLogger(loggerName[1]);
        }

        return LoggerFactory.createLogger('global');

    }
}



export default LoggerFactory