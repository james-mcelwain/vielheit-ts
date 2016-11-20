import * as React from 'react';
import {inject, observer} from "mobx-react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
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
class AddUserForm extends React.Component<{userStore?: IUserStore}, IAddUserFormState> {
    private state: IAddUserFormState = new AddUserFormState();

    private async onSubmit(e) {
        e.preventDefault();
        const res = await this.props.userStore.addUser(this.state).catch(/* TODO: Error handling */);
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
                    hintText="Username"
                    type="text"
                    name="username"
                    onChange={this.handleChange.bind(this)}
                    value={state.username}/>

                <br/>

                <TextField
                    hintText="First Name"
                    type="text"
                    name="fname"
                    onChange={this.handleChange.bind(this)}
                    value={state.fname}/>

                <br/>

                <TextField
                    hintText="Last Name"
                    type="text"
                    name="lname"
                    onChange={this.handleChange.bind(this)}
                    value={state.lname}/>

                <br/>

                <TextField
                    hintText="Email"
                    type="text"
                    name="email"
                    onChange={this.handleChange.bind(this)}
                    value={state.email}/>

                <br/>

                <TextField
                    hintText="Password"
                    type="password"
                    name="password"
                    onChange={this.handleChange.bind(this)}
                    value={state.password}/>

                <br/>

                <TextField
                    hintText="Confirm"
                    type="password"
                    name="confirm"
                    onChange={this.handleChange.bind(this)}
                    value={state.confirm}/>

                <br/>
                <br/>

                <RaisedButton type="submit">Register</RaisedButton>
            </form>
        );
    }
}

export default AddUserForm