import * as React from 'react';
import {observer} from "mobx-react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import {IUserStore} from "../stores/user";

interface ILoginFormState {
    email: string
    password: string
    confirm: string
}

class LoginFormState implements ILoginFormState {
    public email = '';
    public password = '';
    public confirm = '';
}

@observer(['userStore'])
class LoginForm extends React.Component<{userStore?: IUserStore}, ILoginFormState> {
    private state: ILoginFormState = new LoginFormState();

    private async onSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        const res = await this.props.userStore.authenticateUser({email, password}).catch(/* TODO: Error handling */);
    }

    private handleChange(e: any) {
        this.setState({[e.target.name]: e.target.value})
    }

    public render() {
        const {state} = this;
        return (
            <form className="login-form"
                  onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    hintText="Email"
                    name="email"
                    onChange={this.handleChange.bind(this)}
                    value={state.email}/>
                <br/>

                <TextField
                    hintText="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange.bind(this)}
                    value={state.password}/>
                <br/>

                <TextField
                    hintText="Confirm"
                    name="confirm"
                    type="password"
                    onChange={this.handleChange.bind(this)}
                    value={state.confirm}/>
                <br/>
                <br/>

                <RaisedButton type="submit">Login</RaisedButton>
            </form>
        );
    }
}

export default LoginForm