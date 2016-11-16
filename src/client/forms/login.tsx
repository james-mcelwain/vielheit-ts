import * as React from 'react';
import {inject} from "mobx-react";
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
    public confirm = ';'
}

const initialState = observable(new LoginFormState());

@inject(({userStore}) => ({userStore}))
class LoginForm extends React.Component<{userStore?: IUserStore}, ILoginFormState> {
    private state: ILoginFormState = initialState;

    private async onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const res = await this.props.userStore.authenticateUser({email, password}).catch( /* TODO: Error handling */ );
    }

    public render() {
        const {state} = this;
        return (
            <form className="login-form"
                  onSubmit={this.onSubmit.bind(this)}>
                <label> Email
                    <input type="text"
                           name="email"
                           onChange={e => Reflect.set(state, e.target.name, e.target.value)}
                           value={state.email}/>
                </label>

                <label> Password:
                    <input type="password"
                           name="password"
                           onChange={e => Reflect.set(state, e.target.name, e.target.value)}
                           value={state.password}/>
                </label>

                <label> Confirm:
                    <input type="password"
                           name="confirm"
                           onChange={e => Reflect.set(state, e.target.name, e.target.value)}
                           value={state.confirm}/>
                </label>

                <button type="submit">Login</button>
            </form>
        );
    }
}

export default LoginForm