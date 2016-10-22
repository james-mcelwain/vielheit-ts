import {createLogger, LoggerOptions, stdSerializers as serializers} from "bunyan";
import {injectable} from "inversify";
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
            logger['format'] = (req: any) => {
              return `req=${req.uuid}${req.session ? ` session=${req.session}` : ''}`
            };
            LoggerFactory.loggers[name] = logger;
        }

        return LoggerFactory.loggers[name]
    }

    private static loggers: { [key: string]: ILogger } = {};

    public static getLogger(name: Object): ILogger {
        return LoggerFactory.createLogger(name.constructor.toString().match(/class ([\w|_]+)/)[1])
    }
}

export default LoggerFactory