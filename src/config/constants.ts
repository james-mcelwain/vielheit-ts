const __ = {
    App: Symbol('App'),

    DatabaseProvider: Symbol('DatabaseProvider'),
    Database: Symbol('Database'),
    
    Logger: Symbol('Logger'),
    LoggerFactory: Symbol('LoggerFactory'),

    HTTPServer: Symbol('HTTPServer'),
    Router: Symbol('Router'),
    
    UserService: Symbol('UserService'),
    SessionService: Symbol('SessionService'),
    CacheService: Symbol('CacheService'),
    IsomorphicReactService: Symbol('IsomorphicReactService'),
};

export const API_BASE = '/api/';

export default __
