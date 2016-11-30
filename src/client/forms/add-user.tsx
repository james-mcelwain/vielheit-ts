import * as React from 'react';
import {values} from "ramda";
import {observer} from "mobx-react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import {observable} from "mobx";
import IUserStore from "../interfaces/user-store";

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
    @observable
    public state: IAddUserFormState = new AddUserFormState();

    private async onSubmit(e: Event) {
        e.preventDefault();
        if (this.props.userStore) await this.props.userStore.addUser(this.state)
    }

    @observable
    private emailError: string | null = null;
    @observable
    private valid = false;

    private handleChange(e: any) {
        const name: string = e.target.name;
        const value = e.target.value;

        if (name === 'email' && /@/.test(value)) { // todo: focus
            if(this.props.userStore) this.props.userStore.findEmail({ email: value }).then((x: boolean) => {
                if (x) {
                    this.emailError = 'Email already taken';
                } else {
                    this.emailError = null;
                }
            })
        }

        this.setState({ [name]: value } as IAddUserFormState);
        if (values(this.state).every(x => !!x) && !this.emailError && (this.state.password === this.state.confirm)) {
            this.valid = true
        }
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
                    errorText={this.emailError}
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

                <RaisedButton
                    type="submit"
                    disabled={this.valid}>Register</RaisedButton>
            </form>
        );
    }
}

export default AddUserForm