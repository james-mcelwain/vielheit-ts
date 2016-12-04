import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from "mobx-react";
import UserStore from "./stores/user";
import {HttpService} from "./services/http";
import SessionService from "./services/session";

/*
 We create httpService as a singleton that was can use it as an
 interceptor for 400 errors.

 Same thing with the userStore, it will store information about
 the auth state of the current user.
 */

const sessionService = new SessionService();
const httpService = new HttpService(sessionService);
const userStore = new UserStore(httpService);

const app =
    <Provider userStore={userStore} httpService={httpService} sessionService={sessionService}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>;

ReactDOM.render(app, document.getElementById('app'));
