import * as React from 'react';
const ReactToastr: any = require('react-toastr')
import {inject} from 'mobx-react';
import {autorun} from "mobx";
import {IHttpService} from "../services/http";
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

@inject(({httpService}) => ({httpService}))
export default class AppFrame extends React.Component<{httpService?: IHttpService}, any> {
    private errorListener = null;

    private componentWillUnmount() {
        this.errorListener = null;
    }

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

    private render() {
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
