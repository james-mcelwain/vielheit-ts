import * as React from 'react';
import Loading from './loading';
import LoginForm from "../forms/login";

class LoginView extends React.Component<{}, {loaded: boolean}>{
    public state = {
        loaded: false
    };


    private componentDidMount() {
        this.setState({ loaded: true });
    }

    public render() {
        return this.state.loaded? <LoginForm/> : <Loading/>
    }
}

export default LoginView;