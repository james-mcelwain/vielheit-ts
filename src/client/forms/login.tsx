import * as React from 'react';

const initialState = {
    email: '',
    password: '',
    confirm: ''
};

interface ILoginForm {
    email: string
    password: string
    confirm: string
}

class LoginForm extends React.Component<{}, ILoginForm> {
    private state: ILoginForm = initialState;

    onSubmit() {

    }

    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label> Email
                    <input type="text"/>
                </label>

                <label> Password:
                    <input type="password" />
                </label>

                <label> Confirm:
                    <input type="password" />
                </label>

                <button type="submit">Login</button>
            </form>
        );
    }
}

export default LoginForm