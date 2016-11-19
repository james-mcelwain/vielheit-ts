import * as React from 'react';
import {inject} from "mobx-react";
import {observable} from "mobx";
import {IUserStore} from "../stores/user";

interface IAddUserFormState {
    username: string
    fname: string
    lname: string
    email: string
    password: string
    confirm: string
}

class LoginFormState implements IAddUserFormState {
    public username = '';
    public fname = '';
    public lname = '';
    public email = '';
    public password = '';
    public confirm = ';'
}

const initialState = observable(new LoginFormState());

@inject(({userStore}) => ({userStore}))
class LoginForm extends React.Component<{userStore?: IUserStore}, IAddUserFormState> {
    private state: IAddUserFormState = initialState;

    private async onSubmit(e) {
        e.preventDefault();
        const res = await this.props.userStore.addUser(this.state).catch( /* TODO: Error handling */ );
    }

    public render() {
        const {state} = this;
        return (
            <form className="login-form"
                  onSubmit={this.onSubmit.bind(this)}>
                <label> Username
                    <input type="text"
                           name="username"
                           onChange={e => Reflect.set(state, e.target.name, e.target.value)}
                           value={state.username}/>
                </label>

                <label> First Name
                    <input type="text"
                           name="fname"
                           onChange={e => Reflect.set(state, e.target.name, e.target.value)}
                           value={state.fname}/>
                </label>

                <label> Last Name
                    <input type="text"
                           name="lname"
                           onChange={e => Reflect.set(state, e.target.name, e.target.value)}
                           value={state.lname}/>
                </label>

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

                <button type="submit">Register</button>
            </form>
        );
    }
}

export default LoginForm