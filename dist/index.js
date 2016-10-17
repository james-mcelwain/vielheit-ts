/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const di_config_1 = __webpack_require__(1);
	const app_constants_1 = __webpack_require__(4);
	const title = `
	    ___       ___       ___       ___   
	   /\\__\\     /\\  \\     /\\  \\     /\\__\\  
	  /:/ _/_   _\\:\\  \\   /::\\  \\   /:/  /  
	 |::L/\\__\\ /\\/::\\__\\ /::\\:\\__\\ /:/__/   
	 |::::/  / \\::/\\/__/ \\:\\:\\/  / \\:\\  \\   
	  L;;/__/   \\:\\__\\    \\:\\/  /   \\:\\__\\  
	             \\/__/     \\/__/     \\/__/  
	    ___       ___       ___       ___   
	   /\\__\\     /\\  \\     /\\  \\     /\\  \\  
	  /:/__/_   /::\\  \\   _\\:\\  \\    \\:\\  \\ 
	 /::\\/\\__\\ /::\\:\\__\\ /\\/::\\__\\   /::\\__\\
	 \\/\\::/  / \\:\\:\\/  / \\::/\\/__/  /:/\\/__/
	   /:/  /   \\:\\/  /   \\:\\__\\    \\/__/   
	   \\/__/     \\/__/     \\/__/            
	________________________________________                                                       
	`;
	console.log(title);
	const app = di_config_1.default.get(app_constants_1.default.App);
	process.on('uncaughtException', (...args) => { app.logger.fatal(...args); process.exit(1); });
	process.on('unhandledRejection', (...args) => { app.logger.fatal(...args); process.exit(1); });
	app.bootstrap();
	function graceful_shutdown() {
	    app.close();
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = graceful_shutdown;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	const inversify_1 = __webpack_require__(3);
	const app_constants_1 = __webpack_require__(4);
	const entities_1 = __webpack_require__(5);
	const db_1 = __webpack_require__(18);
	const inversify_restify_utils_1 = __webpack_require__(9);
	const index_1 = __webpack_require__(23);
	const users_1 = __webpack_require__(26);
	const kernel = new inversify_1.Kernel();
	// ENTITIES
	// App -
	// Our base class to run the application
	kernel
	    .bind(app_constants_1.default.App)
	    .to(entities_1.App);
	// DatabaseProvider -
	// Deals with initialization logic for database
	kernel
	    .bind(app_constants_1.default.DatabaseProvider)
	    .to(db_1.default)
	    .inSingletonScope();
	// Database
	// In our case, an instnace of a postgres client
	kernel
	    .bind(app_constants_1.default.Database)
	    .toConstantValue(kernel.get(app_constants_1.default.DatabaseProvider).getDatabase());
	// HTTPServer -
	// A generic server exposing GET, POST, PUT, and DEL
	kernel
	    .bind(app_constants_1.default.HTTPServer)
	    .to(entities_1.HTTPServer);
	// LoggerFactory -
	// Static class providing loggers
	kernel
	    .bind(app_constants_1.default.LoggerFactory)
	    .toConstantValue(entities_1.LoggerFactory);
	// SERVICES
	// UserService -
	kernel
	    .bind(app_constants_1.default.UserService)
	    .to(entities_1.UserService)
	    .inSingletonScope();
	// ROUTES
	// Home -
	// Serves core assets and application, index.html, etc.
	kernel
	    .bind(inversify_restify_utils_1.TYPE.Controller)
	    .to(index_1.default)
	    .whenTargetNamed('HomeController');
	// Users -
	// TODO: API description
	kernel.bind(inversify_restify_utils_1.TYPE.Controller)
	    .to(users_1.default)
	    .whenTargetNamed('UsersController');
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = kernel;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("reflect-metadata");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("inversify");

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	const __ = {
	    App: Symbol('App'),
	    DatabaseProvider: Symbol('DatabaseProvider'),
	    Database: Symbol('Database'),
	    Logger: Symbol('Logger'),
	    LoggerFactory: Symbol('LoggerFactory'),
	    HTTPServer: Symbol('HTTPServer'),
	    Router: Symbol('Router'),
	    UserService: Symbol('UserService'),
	};
	exports.API_BASE = '/api/';
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = __;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const app_1 = __webpack_require__(6);
	exports.App = app_1.default;
	const http_server_1 = __webpack_require__(7);
	exports.HTTPServer = http_server_1.default;
	const logger_factory_1 = __webpack_require__(11);
	exports.LoggerFactory = logger_factory_1.default;
	const user_service_1 = __webpack_require__(13);
	exports.UserService = user_service_1.default;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(3);
	const app_constants_1 = __webpack_require__(4);
	let App = class App {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    bootstrap() {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('starting services');
	            this.httpServer.onBootstrap(this.userService.onBootstrap.bind(this.userService));
	            this.httpServer.listen();
	            return true;
	        });
	    }
	    close() {
	        this.httpServer.close(() => {
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(app_constants_1.default.HTTPServer), 
	    __metadata('design:type', Object)
	], App.prototype, "httpServer", void 0);
	__decorate([
	    inversify_1.inject(app_constants_1.default.UserService), 
	    __metadata('design:type', Object)
	], App.prototype, "userService", void 0);
	App = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(app_constants_1.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], App);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = App;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const restify_1 = __webpack_require__(8);
	const inversify_restify_utils_1 = __webpack_require__(9);
	const di_config_1 = __webpack_require__(1);
	const inversify_1 = __webpack_require__(3);
	const app_constants_1 = __webpack_require__(4);
	const node_uuid_1 = __webpack_require__(10);
	let HTTPServer = class HTTPServer {
	    constructor(port = 8080, name = '', version = '') {
	        this.toBootstrap = [];
	        this.port = port;
	        this.router = new inversify_restify_utils_1.InversifyRestifyServer(di_config_1.default);
	    }
	    get version() { return this.server.version; }
	    set version(version) { this.server.version = version; }
	    get name() { return this.server.name; }
	    set name(name) { this.server.name = name; }
	    onBootstrap(fn) {
	        return new Promise((resolve, reject) => {
	            this.toBootstrap.push(() => {
	                return fn((err, result) => err ? reject(err) : resolve(result));
	            });
	        });
	    }
	    listen() {
	        this.logger = this.LoggerFactory.getLogger(this);
	        this.toBootstrap.forEach((fn) => {
	            fn();
	        });
	        this.server = this.router
	            .setConfig((app) => {
	            app.use((req, res, next) => {
	                req.start = Date.now();
	                req.uuid = node_uuid_1.v4();
	                this.logger.info(`| ${req.uuid} | method=${req.method} url=${req.url}`);
	                next();
	            });
	            app.use(restify_1.CORS());
	            app.use(restify_1.bodyParser());
	        })
	            .build();
	        this.server.on('after', (req, res, route, err) => {
	            err && err.name !== 'BadRequestError' && this.logger.error(err);
	            this.logger.info(`| ${req.uuid} | url=${req.url} status=${res.statusCode} time=${Date.now() - req.start}`);
	        });
	        this.server.on('uncaughtEception', (req, res, route, err) => {
	            this.logger.fatal(`route=${route}`, err);
	            process.exit(1);
	        });
	        this.server.on('unhandledRejection', (req, res, route, err) => {
	            this.logger.fatal(`route=${route}`, err);
	            process.exit(1);
	        });
	        this.server.on('InternalServer', (req, res, err, cb) => {
	            this.logger.error(err);
	            console.log(req.body);
	            // TODO
	            const page = `
	            <h1>sorry, this is broken right now... try again later?</h1>
	
	            ${true ? `<div style="background: #feeeee">
	                <pre>${err}</pre>
	                <pre>${err.stack}</pre>
	              </div>` : ''}
	            `;
	            res.writeHead(500);
	            if (req.method === 'GET') {
	                res.end(page);
	            }
	            cb();
	        });
	        this.server.on('BadRequest', (req, res, err, cb) => {
	            if (err.jse_cause) {
	                err.body.message = JSON.stringify({ errors: err.jse_cause.errors });
	            }
	            cb();
	        });
	        this.server.on('NotFound', (req, res, err, cb) => {
	            req.uuid = node_uuid_1.v4();
	            req.start = Date.now();
	            const page = `
	            <h1>404</h1>
	            `;
	            res.writeHead(404);
	            res.end(page);
	            cb();
	        });
	        this.server.listen(this.port, () => this.logger.info(`${this.name} listening on ${this.port}`));
	    }
	    close(callback) {
	        this.server.close(callback);
	    }
	};
	__decorate([
	    inversify_1.inject(app_constants_1.default.LoggerFactory), 
	    __metadata('design:type', Object)
	], HTTPServer.prototype, "LoggerFactory", void 0);
	HTTPServer = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [Number, String, String])
	], HTTPServer);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = HTTPServer;


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("restify");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("inversify-restify-utils");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("node-uuid");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const bunyan_1 = __webpack_require__(12);
	const inversify_1 = __webpack_require__(3);
	let LoggerFactory_1 = class LoggerFactory {
	    static makeDefaultConfig() {
	        return { name: '', serializers: bunyan_1.stdSerializers };
	    }
	    static makeConfig(name, options) {
	        options.name = name;
	        return options;
	    }
	    static createLogger(name) {
	        if (!LoggerFactory_1.loggers[name]) {
	            LoggerFactory_1.loggers[name] = bunyan_1.createLogger(LoggerFactory_1.makeConfig(name, LoggerFactory_1.config));
	        }
	        return LoggerFactory_1.loggers[name];
	    }
	    static getLogger(name) {
	        return LoggerFactory_1.createLogger(name.constructor.toString().match(/class ([\w|_]+)/)[1]);
	    }
	};
	let LoggerFactory = LoggerFactory_1;
	LoggerFactory.config = LoggerFactory.makeDefaultConfig();
	LoggerFactory.loggers = {};
	LoggerFactory = LoggerFactory_1 = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [])
	], LoggerFactory);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = LoggerFactory;


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("bunyan");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(3);
	const bcrypt_1 = __webpack_require__(14);
	const Validator_1 = __webpack_require__(15);
	const Validation_1 = __webpack_require__(16);
	const bluebird_1 = __webpack_require__(17);
	const app_constants_1 = __webpack_require__(4);
	const validator = new Validator_1.Validator();
	const SALT_WORK_FACTOR = 15;
	const hashAsync = bluebird_1.promisify(bcrypt_1.hash);
	const compareAsync = bluebird_1.promisify(bcrypt_1.compare);
	let UserService = class UserService {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    onBootstrap() {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('create users table');
	            return this.db.users.create();
	        });
	    }
	    findByEmail(email) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.users.findByEmail(email);
	        });
	    }
	    createUser(req) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const user = new User();
	            user.username = req.username;
	            user.email = req.email;
	            user.password = req.password;
	            user.fname = req.fname;
	            user.lname = req.lname;
	            validator.validateOrThrow(user);
	            const emailExists = yield this.db.users.findEmail(user.email);
	            if (emailExists) {
	                throw new Error('Email already exists');
	            }
	            yield this.db.users.add(user);
	        });
	    }
	    updatePassword(userId, oldPassword, newPassword) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const user = yield this.db.users.find(userId);
	            const passwordHash = user.password;
	            const candidateHash = yield bluebird_1.promisify(bcrypt_1.hash)(oldPassword, SALT_WORK_FACTOR);
	            const valid = yield bluebird_1.promisify(bcrypt_1.compare)(candidateHash, passwordHash);
	            if (valid) {
	                return this.db.users.updatePassword(newPassword, userId);
	            }
	            return Promise.reject(new Error());
	        });
	    }
	    authenticate(candidate, passwordHash) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const candidateHash = yield hashAsync(candidate, SALT_WORK_FACTOR);
	            const valid = yield compareAsync(candidateHash, passwordHash);
	            this.logger.fatal(valid);
	            return valid;
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(app_constants_1.default.Database), 
	    __metadata('design:type', Object)
	], UserService.prototype, "db", void 0);
	UserService = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(app_constants_1.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], UserService);
	class ValidateUserReq {
	    set id(id) {
	        this._id = id + '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], ValidateUserReq.prototype, "_id", void 0);
	__decorate([
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], ValidateUserReq.prototype, "password", void 0);
	class User {
	}
	__decorate([
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], User.prototype, "username", void 0);
	__decorate([
	    Validation_1.IsEmail(), 
	    __metadata('design:type', String)
	], User.prototype, "email", void 0);
	__decorate([
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], User.prototype, "password", void 0);
	__decorate([
	    Validation_1.IsLength(3, 20), 
	    __metadata('design:type', String)
	], User.prototype, "fname", void 0);
	__decorate([
	    Validation_1.IsLength(3, 20), 
	    __metadata('design:type', String)
	], User.prototype, "lname", void 0);
	exports.User = User;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UserService;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("validator.ts/Validator");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("validator.ts/decorator/Validation");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const inversify_1 = __webpack_require__(3);
	const promise = __webpack_require__(17);
	const pgPromise = __webpack_require__(19);
	const users_1 = __webpack_require__(20);
	let DatabaseProvider = class DatabaseProvider {
	    constructor() {
	        const options = {
	            promiseLib: promise,
	            extend: (obj) => {
	                obj.users = new users_1.Repository(obj);
	            }
	        };
	        const config = {
	            host: 'localhost',
	            port: 5432,
	            database: process.env.PG_DATABASE || 'vielheit',
	            user: process.env.PG_USER || 'postgres',
	            password: process.env.PG_PASSWORD || 'postgres'
	        };
	        this.db = pgPromise(options)(config);
	    }
	    getDatabase() {
	        return this.db;
	    }
	};
	DatabaseProvider = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [])
	], DatabaseProvider);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DatabaseProvider;


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("pg-promise");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const sql_1 = __webpack_require__(21);
	const sql = sql_1.default.users;
	class Repository {
	    constructor(db) {
	        this.db = db;
	    }
	    create() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.create);
	        });
	    }
	    init() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.tx('Init-Users', (t) => t.map(sql.init, null, (row) => row.id));
	        });
	    }
	    drop() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.drop);
	        });
	    }
	    empty() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.empty);
	        });
	    }
	    add(user) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.one(sql.add, user, (u) => u.id);
	        });
	    }
	    remove(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result('DELETE FROM Users WHERE ID = $1', id, (r) => r.rowcount);
	        });
	    }
	    find(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.oneOrNone('SELECT * FROM Users WHERE id = $1', id);
	        });
	    }
	    findByEmail(email) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.oneOrNone('SELECT * FROM Users WHERE email = $1', email);
	        });
	    }
	    all() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.any('SELECT * FROM Users');
	        });
	    }
	    total() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.one('SELECT count(*) FROM Users', [], (a) => +a.count);
	        });
	    }
	    updatePassword(password, id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.oneOrNone(sql.updatePassword, [password, id], (u) => u.id);
	        });
	    }
	}
	exports.Repository = Repository;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const pg_promise_1 = __webpack_require__(19);
	const path = __webpack_require__(22);
	class SQL_Helper {
	    static readFile(file) {
	        const fullPath = path.join('../src/db/sql', file);
	        const options = {
	            minify: true,
	            params: {
	                schema: 'public'
	            },
	        };
	        return new pg_promise_1.QueryFile(fullPath, options);
	    }
	}
	exports.SQL_Helper = SQL_Helper;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    users: {
	        create: SQL_Helper.readFile('users/create.sql'),
	        empty: SQL_Helper.readFile('users/empty.sql'),
	        init: SQL_Helper.readFile('users/init.sql'),
	        drop: SQL_Helper.readFile('users/drop.sql'),
	        add: SQL_Helper.readFile('users/add.sql'),
	        updatePassword: SQL_Helper.readFile('users/update-password'),
	    },
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const restify_errors_1 = __webpack_require__(24);
	const inversify_restify_utils_1 = __webpack_require__(9);
	const inversify_1 = __webpack_require__(3);
	const path_1 = __webpack_require__(22);
	const fs_1 = __webpack_require__(25);
	const bluebird_1 = __webpack_require__(17);
	const app_constants_1 = __webpack_require__(4);
	let rFile = bluebird_1.promisify(fs_1.readFile);
	let HomeController = class HomeController {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    index(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            try {
	                const index = yield rFile(path_1.join('.', 'src/index.html'));
	                res.writeHead(200);
	                res.end(index);
	                next();
	            }
	            catch (e) {
	                next(new restify_errors_1.InternalServerError(e));
	            }
	        });
	    }
	    bundle(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            try {
	                const bundle = yield rFile(path_1.join('.', 'dist/bundle.js'));
	                res.writeHead(200);
	                res.end(bundle);
	                next();
	            }
	            catch (e) {
	                next(new restify_errors_1.InternalServerError(e));
	            }
	        });
	    }
	};
	__decorate([
	    inversify_restify_utils_1.Get('/'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HomeController.prototype, "index", null);
	__decorate([
	    inversify_restify_utils_1.Get('/public/bundle.js'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HomeController.prototype, "bundle", null);
	HomeController = __decorate([
	    inversify_1.injectable(),
	    inversify_restify_utils_1.Controller('/'),
	    __param(0, inversify_1.inject(app_constants_1.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], HomeController);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = HomeController;


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("restify-errors");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const restify_errors_1 = __webpack_require__(24);
	const inversify_restify_utils_1 = __webpack_require__(9);
	const inversify_1 = __webpack_require__(3);
	const pg_promise_1 = __webpack_require__(19);
	const app_constants_1 = __webpack_require__(4);
	const app_constants_2 = __webpack_require__(4);
	const validate_1 = __webpack_require__(27);
	let UsersController = class UsersController {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    test(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            console.log('this', this);
	        });
	    }
	    create(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            try {
	                yield this.db.users.create();
	                res.send(200);
	                return next();
	            }
	            catch (e) {
	                next(new restify_errors_1.InternalServerError(e));
	            }
	        });
	    }
	    init(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            try {
	                yield this.db.users.init();
	                res.send(200);
	                return next();
	            }
	            catch (e) {
	                next(new restify_errors_1.InternalServerError(e));
	            }
	        });
	    }
	    empty(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            try {
	                yield this.db.users.empty();
	                res.send(200);
	                return next();
	            }
	            catch (e) {
	                next(new restify_errors_1.InternalServerError(e));
	            }
	        });
	    }
	    authenticate(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const user = yield this.userService.findByEmail(req.body.email);
	            if (!user) {
	                return next(new restify_errors_1.BadRequestError('User not found'));
	            }
	            const valid = yield this.userService.authenticate.bind(this)(req.body.password, user.password);
	            res.send(valid);
	            return next();
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(app_constants_2.default.UserService), 
	    __metadata('design:type', Object)
	], UsersController.prototype, "userService", void 0);
	__decorate([
	    inversify_1.inject(app_constants_2.default.Database), 
	    __metadata('design:type', (typeof (_a = typeof pg_promise_1.IDatabase !== 'undefined' && pg_promise_1.IDatabase) === 'function' && _a) || Object)
	], UsersController.prototype, "db", void 0);
	__decorate([
	    validate_1.default, 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "test", null);
	__decorate([
	    inversify_restify_utils_1.Get('/create'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "create", null);
	__decorate([
	    inversify_restify_utils_1.Get('/init'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "init", null);
	__decorate([
	    inversify_restify_utils_1.Get('/empty'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "empty", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/authenticate'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "authenticate", null);
	UsersController = __decorate([
	    inversify_1.injectable(),
	    inversify_restify_utils_1.Controller(`${app_constants_1.API_BASE}/users`),
	    __param(0, inversify_1.inject(app_constants_2.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], UsersController);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UsersController;
	var _a;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Validator_1 = __webpack_require__(15);
	const restify_errors_1 = __webpack_require__(24);
	const validators_1 = __webpack_require__(28);
	function Valdiate(target, propertyKey, descriptor) {
	    const validatorName = `${target.constructor.toString().match(/class ([\w|_]+)/)[1]}_${propertyKey}`;
	    const ValidationClass = Reflect.get(validators_1.default, validatorName);
	    const method = descriptor.value;
	    descriptor.value = function (...args) {
	        const req = args[0];
	        const next = args[args.length - 1];
	        try {
	            const validationRequest = getValidationRequest(ValidationClass, req);
	            const validator = new Validator_1.Validator();
	            validator.validateOrThrow(validationRequest);
	            method.call(this, ...args);
	        }
	        catch (e) {
	            if (e.name === 'ValidationError') {
	                return next(new restify_errors_1.BadRequestError(e));
	            }
	            next(new restify_errors_1.InternalServerError(e));
	        }
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Valdiate;
	function getValidationRequest(Klass, req) {
	    const instance = new Klass();
	    for (let key in req.body) {
	        const val = req.body[key];
	        if (val) {
	            Reflect.set(instance, key, String(val));
	        }
	    }
	    return instance;
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Validation_1 = __webpack_require__(16);
	class UsersController_authenticate {
	    constructor() {
	        this.email = ''; // TODO: It sucks to have to initialize these
	        this.password = '';
	    }
	}
	__decorate([
	    Validation_1.IsEmail(), 
	    __metadata('design:type', String)
	], UsersController_authenticate.prototype, "email", void 0);
	__decorate([
	    // TODO: It sucks to have to initialize these
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], UsersController_authenticate.prototype, "password", void 0);
	const _validators = {
	    UsersController_authenticate,
	};
	const validators = new Proxy(_validators, {
	    get(target, name) {
	        return name in target ?
	            target[name] : new Error(`Validator ${name} not found!`);
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = validators;


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map