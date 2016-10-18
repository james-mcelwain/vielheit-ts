import 'reflect-metadata'
import {Kernel} from 'inversify'
import __ from './constants'
import {IApp, IHTTPServer, IUserService, IDatabaseProvider, 
    ISessionService, ICacheService } from '../interfaces'
import {App, HTTPServer, LoggerFactory, UserService, 
    SessionService, CacheService } from '../entities'
import DatabaseProvider from '../db'
import {IDatabase} from 'pg-promise'
import {TYPE} from 'inversify-restify-utils';
import IController from '../interfaces/controller'
import HomeController from '../controllers/index'
import UsersController from '../controllers/users'
import {IExtensions} from "../db/index";

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
    .bind<IController>(TYPE.Controller)
    .to(HomeController)
    .whenTargetNamed('HomeController');

// Users -
// TODO: API description
kernel.bind<IController>(TYPE.Controller)
    .to(UsersController)
    .whenTargetNamed('UsersController');

export default kernel
