import ILogger from './logger'

interface IApp {
    logger: ILogger,
    bootstrap(): any,
    close(): any,
}

export default IApp