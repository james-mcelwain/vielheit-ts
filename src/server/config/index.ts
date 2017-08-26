import "reflect-metadata";
import {Container} from "inversify";
import __ from "./constants";
import DatabaseProvider from "../db";
import {IDatabase} from "pg-promise";
import {TYPE} from "inversify-restify-utils";
import IController from "../interfaces/controller";
import UsersController from "../controllers/users";
import {IExtensions} from "../db/index";
import IApp from "../interfaces/app";
import App from "../core/app";
import IDatabaseProvider from "../interfaces/database-provider";
import IHTTPServer from "../interfaces/http-server";
import HTTPServer from "../core/http-server";
import LoggerFactory from "../core/logger-factory";
import IUserService from "../interfaces/user-service";
import UserService from "../services/user";
import ISessionService from "../interfaces/session-service";
import SessionService from "../services/session";
import ICacheService from "../interfaces/cache-service";
import CacheService from "../services/cache";
import PublicController from "../controllers/public";
import {IAppConfig} from '../interfaces/app-config';
import * as uuid from 'node-uuid';

const container = new Container();

// ENTITIES

// App -
// Our base class to run the application
container
    .bind<IApp>(__.App)
    .to(App);

// AppConfig -
// Some configuration properties

container
    .bind<IAppConfig>(__.AppConfig)
    .toConstantValue({
        port: 8080,
        name: 'vielheit',
        version: uuid.v4(),
    })

// DatabaseProvider -
// Deals with initialization logic for database
container
    .bind<IDatabaseProvider>(__.DatabaseProvider)
    .to(DatabaseProvider)
    .inSingletonScope();

// Database
// In our case, an instnace of a postgres client
container
    .bind<IDatabase<IExtensions>>(__.Database)
    .toConstantValue(container.get<IDatabaseProvider>(__.DatabaseProvider).getDatabase());


// HTTPServer -
// A generic server exposing GET, POST, PUT, and DEL
container
    .bind<IHTTPServer>(__.HTTPServer)
    .to(HTTPServer)
    .inSingletonScope();

// LoggerFactory -
// Static class providing loggers
container
    .bind<LoggerFactory>(__.LoggerFactory)
    .toConstantValue(LoggerFactory);

// SERVICES

// UserService -
container
    .bind<IUserService>(__.UserService)
    .to(UserService)
    .inSingletonScope();

// SessionService -
container
    .bind<ISessionService>(__.SessionService)
    .to(SessionService)
    .inSingletonScope();
    
// CacheService -
container
.bind<ICacheService>(__.CacheService)
    .to(CacheService)
    .inSingletonScope();

// ROUTES

// Public-
// Serves core assets and application, index.html, etc.
container
    .bind<IController>(<any> TYPE.Controller)
    .to(PublicController)
    .whenTargetNamed('PublicController');

// Users -
// Core API for dealing with users / authentication
container.bind<IController>(<any> TYPE.Controller)
    .to(UsersController)
    .whenTargetNamed('UsersController');

export default container
