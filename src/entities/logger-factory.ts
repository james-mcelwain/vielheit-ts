import { createLogger, Logger, LoggerOptions, stdSerializers as serializers } from 'bunyan'
import { injectable } from 'inversify'
import { ILogger } from '../interfaces'

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

    private static createLogger(name): ILogger {
        if (!LoggerFactory.loggers[name]) {
            LoggerFactory.loggers[name] = <ILogger> createLogger(LoggerFactory.makeConfig(name, LoggerFactory.config))
        }

        return LoggerFactory.loggers[name]
    }

    private static loggers: { [key: string]: ILogger } = {};

    public static setOption(key: string, value: any) {
        LoggerFactory.config[key] = value
    }

    public static getLogger(name: Object): ILogger {
        return LoggerFactory.createLogger(name.constructor.toString().match(/class ([\w|_]+)/)[1])
    }
}

export default LoggerFactory