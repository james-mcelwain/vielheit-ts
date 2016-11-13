import {Server} from "restify";

interface IIsomorphicReactService {
    onBootstrap(server: Server): any
}

export default IIsomorphicReactService;