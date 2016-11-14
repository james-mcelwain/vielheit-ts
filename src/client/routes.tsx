import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppFrame from './views/app-frame';
import NotFoundView from './views/not-found-view';
import HomeView from './views/home-view';
import AboutView from './views/about-view';
import LoginView from "./views/login-view";

var routeMap = (
    <Route path="/" component={AppFrame}>
        <IndexRoute component={HomeView}/>
        <Route path="/login" component={LoginView}/>
        <Route path="/about" component={AboutView}/>
        <Route path="*" component={NotFoundView} />
    </Route>
);

export default routeMap;