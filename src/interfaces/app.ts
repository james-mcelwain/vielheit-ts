import ILogger from "./logger";

interface IApp {
    logger: ILogger,
    bootstrap(): Promise<any>,
    close(): any;
}

export default IApp