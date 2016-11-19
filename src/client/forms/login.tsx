import * as React from 'react';
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
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
        const { email, password } = this.state;
        const res = await this.props.userStore.authenticateUser({email, password}).catch( /* TODO: Error handling */ );
    }

    private handleChange(e: any) {
        this.setState({ [e.target.name]: e.target.value })
    }

    public render() {
        const {state} = this;
        return (
            <form className="login-form"
                  onSubmit={this.onSubmit.bind(this)}>
                <label> Email
                    <input type="text"
                           name="email"
                           onChange={this.handleChange.bind(this)}
                           value={state.email}/>
                </label>

                <label> Password:
                    <input type="password"
                           name="password"
                           onChange={this.handleChange.bind(this)}
                           value={state.password}/>
                </label>

                <label> Confirm:
                    <input type="password"
                           name="confirm"
                           onChange={this.handleChange.bind(this)}
                           value={state.confirm}/>
                </label>

                <button type="submit">Login</button>
            </form>
        );
    }
}

export default LoginForm