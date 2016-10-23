import "reflect-metadata";
import {Kernel} from "inversify";
import __ from "./constants";
import DatabaseProvider from "../db";
import {IDatabase} from "pg-promise";
import {TYPE} from "inversify-restify-utils";
import IController from "../interfaces/controller";
import HomeController from "../controllers/index";
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

const kernel = new Kernel();

// ENTITIES

// App -
// Our base class to run the application
kernel
    .bind<IApp>(__.App)
    .to(App);

// DatabaseProvider -
// Deals with initialization logic for database
kernel
    .bind<IDatabaseProvider>(__.DatabaseProvider)
    .to(DatabaseProvider)
    .inSingletonScope();

// Database
// In our case, an instnace of a postgres client
kernel
    .bind<IDatabase<IExtensions>>(__.Database)
    .toConstantValue(kernel.get<IDatabaseProvider>(__.DatabaseProvider).getDatabase());


// HTTPServer -
// A generic server exposing GET, POST, PUT, and DEL
kernel
    .bind<IHTTPServer>(__.HTTPServer)
    .to(HTTPServer);

// LoggerFactory -
// Static class providing loggers
kernel
    .bind<LoggerFactory>(__.LoggerFactory)
    .toConstantValue(LoggerFactory);

// SERVICES

// UserService -
kernel
    .bind<IUserService>(__.UserService)
    .to(UserService)
    .inSingletonScope();

// SessionService -
kernel
    .bind<ISessionService>(__.SessionService)
    .to(SessionService)
    .inSingletonScope();
    
// CacheService -
kernel
.bind<ICacheService>(__.CacheService)
    .to(CacheService)
    .inSingletonScope();

// ROUTES

// Home -
// Serves core assets and application, index.html, etc.
kernel
    .bind<IController>(<any> TYPE.Controller)
    .to(HomeController)
    .whenTargetNamed('HomeController');

// Users -
// Core API for dealing with users / authentication
kernel.bind<IController>(<any> TYPE.Controller)
    .to(UsersController)
    .whenTargetNamed('UsersController');

export default kernel
