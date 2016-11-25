import * as React from 'react';
const ReactToastr = require('react-toastr');
import {inject} from 'mobx-react';
import {autorun} from "mobx";
import IHttpService from "../interfaces/http-service";
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

@inject(({httpService}) => ({httpService}))
export default class AppFrame extends React.Component<{httpService: IHttpService}, any> {
    private errorListener: () => void;

    private componentWillUnmount() {
        Reflect.deleteProperty(this, 'errorListener');
    }

    public refs: {
        [string: string]: any;
        container: any;
    };

    private componentDidMount() {
        setTimeout(() => {
            this.errorListener = autorun(() => {
                if (this.props.httpService.httpErrors.length) {
                    this.refs.container.error(this.props.httpService.getErrorMessage());
                    this.props.httpService.clearErrors()
                }
            })
        })
    }

    public render() {
        return <div>
            <MuiThemeProvider>
                <div>
                    <ToastContainer
                        ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"/>
                    <AppBar
                        title="Vielheit"
                    />
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        </div>
    }
}
