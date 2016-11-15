import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from "mobx-react";
import {UserStore} from "./stores/user";

const app =
    <Provider userStore={new UserStore()}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>;

ReactDOM.render(app, document.getElementById('app'));