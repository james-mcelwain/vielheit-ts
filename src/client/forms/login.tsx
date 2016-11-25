import * as React from 'react';
import {observer} from "mobx-react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import IUserStore from "../interfaces/user-store";

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
    public state: ILoginFormState = new LoginFormState();

    private async onSubmit(e: Event) {
        e.preventDefault();
        const {email, password} = this.state;
        if (this.props.userStore) await this.props.userStore.authenticateUser({email, password})
    }

    private handleChange(e: any) {
        const name: string = e.target.name;
        const value = e.target.value;

        Reflect.set(this.state, name, value)
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