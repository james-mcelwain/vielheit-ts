import 'reflect-metadata'
import {Kernel} from 'inversify'
import __ from './app-constants'
import {IApp, IHTTPServer, IUserService, IDatabaseProvider } from '../interfaces'
import {App, HTTPServer, LoggerFactory, UserService } from '../entities'
import DatabaseProvider from '../db'
import {IDatabase} from 'pg-promise'
import {TYPE} from 'inversify-restify-utils';
import IController from '../interfaces/controller'
import HomeController from '../controllers/index'
import UsersController from '../controllers/users'

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
    .bind<IDatabase>(__.Database)
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
