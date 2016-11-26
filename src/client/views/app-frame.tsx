import * as React from "react";
import {observer, inject} from "mobx-react";
import {autorun, observable} from "mobx";
import IHttpService from "../interfaces/http-service";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import { Link } from 'react-router';
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
const ReactToastr = require('react-toastr');

import injectTapEventPlugin = require('react-tap-event-plugin');
import IUserStore from "../interfaces/user-store";
import ISessionService from "../interfaces/session-service";
injectTapEventPlugin();

const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


class Login extends React.Component<any, any> {
    static muiName = 'FlatButton';

    render() {
        return (
            <Link to="/login"><FlatButton {...this.props} label="Login" /></Link>
        );
    }
}

const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
    </IconMenu>
);

interface IAppFrameState {
    userStore: IUserStore
    sessionService: ISessionService
    httpService: IHttpService
}

Reflect.set(Logged, 'muiName', 'IconMenu');

@inject(({httpService, sessionService}) => ({httpService, sessionService}))
export default class AppFrame extends React.Component<IAppFrameState, any> {
    @observable
    public state = {
        loaded: false,
        authenticated: false
    };

    private errorListener: () => void;

    private componentWillUnmount() {
        Reflect.deleteProperty(this, 'errorListener');
    }

    public refs: {
        [string: string]: any;
        container: any;
    };

    private componentDidMount() {
        console.log(this.props)
        this.setState({authenticated: this.props.sessionService.hasSession()});

        this.setState({ loaded: true });
        setTimeout(() => {
            this.errorListener = autorun(() => {
                if (this.props.httpService.httpErrors.length) {
                    this.refs.container.error(this.props.httpService.getErrorMessage());
                    this.props.httpService.clearErrors()
                }
            })
        })
    }

    public handleChange(event, authenticated) {
        this.setState({authenticated});
    }

    public render() {
        return (!this.state.loaded ? <div style={{ position: 'absolute', width: '100%', height: '100%' }} className="loader"/> : <div>
            <MuiThemeProvider>
                <div>
                    <ToastContainer
                        ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"/>
                    <div>
                        <AppBar
                            title=""
                            iconElementLeft={<div/>}
                            iconElementRight={this.state.authenticated ? <Logged /> : <Login />}
                        />
                    </div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        </div>)
    }
}
