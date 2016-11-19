import * as React from 'react';
import {inject, observer} from "mobx-react";
import {observable, IObservableValue} from "mobx";
import {IUserStore} from "../stores/user";

interface IAddUserFormState {
    username: string
    fname: string
    lname: string
    email: string
    password: string
    confirm: string
}

class AddUserFormState implements IAddUserFormState {
    public username = '';
    public fname = '';
    public lname = '';
    public email = '';
    public password = '';
    public confirm = '';
}

@observer(['userStore'])
class AddUserForm extends React.Component<{userStore?: IUserStore}, IAddUserFormState>{
    private state: IAddUserFormState = new AddUserFormState();

    private async onSubmit(e) {
        e.preventDefault();
        const res = await this.props.userStore.addUser(this.state).catch( /* TODO: Error handling */ );
    }

    private handleChange(e: any) {
        this.setState({ [e.target.name]: e.target.value })
    }

    public render() {
        const {state} = this;
        return (
            <form className="login-form"
                  onSubmit={this.onSubmit.bind(this)}>
                <label> Username
                    <input type="text"
                           name="username"
                           onChange={this.handleChange.bind(this)}
                           value={state.username}/>
                </label>

                <label> First Name
                    <input type="text"
                           name="fname"
                           onChange={this.handleChange.bind(this)}
                           value={state.fname}/>
                </label>

                <label> Last Name
                    <input type="text"
                           name="lname"
                           onChange={this.handleChange.bind(this)}
                           value={state.lname}/>
                </label>

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

                <button type="submit">Register</button>
            </form>
        );
    }
}

export default AddUserForm