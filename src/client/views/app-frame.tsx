import * as React from "react";
import {observer, inject} from "mobx-react";
import {autorun, observable} from "mobx";
import IHttpService from "../interfaces/http-service";
import {Link} from 'react-router';
const ReactToastr = require('react-toastr');

import IUserStore from "../interfaces/user-store";
import ISessionService from "../interfaces/session-service";
import User from "../../domain/impl/user";

const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


class Login extends React.Component<any, any> {
    static muiName = 'FlatButton';

    render() {
        return (
            <Link to="/login"><FlatButton {...this.props} label="Login"/></Link>
        );
    }
}


interface IAppFrameState {
    userStore: IUserStore
    sessionService: ISessionService
    httpService: IHttpService
}

Reflect.set(Logged, 'muiName', 'IconMenu');

@inject(({httpService, sessionService, userStore}) => ({httpService, sessionService, userStore}))
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

    public componentDidMount() {
        setTimeout(() => {
            this.errorListener = autorun(() => {
                if (this.props.httpService.httpErrors.length) {
                    this.refs.container.error(this.props.httpService.getErrorMessage());
                    this.props.httpService.clearErrors()
                }
            })
        });

        if (this.props.sessionService.hasSession()) return this.props.httpService.post('users/session', {}).then((user) => {
            if (user) {
                this.props.userStore.user = new User(user);
            }

            this.setState({authenticated: this.props.sessionService.hasSession()});
            this.setState({loaded: true});
        });

        this.setState({authenticated: this.props.sessionService.hasSession()});
        this.setState({loaded: true});
    }

    public handleChange(event, authenticated) {
        this.setState({authenticated});
    }

    public render() {
        return (!this.state.loaded ?
            <div style={{ position: 'absolute', width: '100%', height: '100%' }} className="loader"/> : <div>
                <div>
                    <ToastContainer
                        ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"/>
                    <div>
                </div>
                    {this.props.children}
                </div>
        </div>)
    }
}
