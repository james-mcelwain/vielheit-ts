import * as React from 'react';
import Loading from './loading';
import AddUserForm from "../forms/add-user";

class AddUserView extends React.Component<any, {loaded: boolean}>{
    public state = {
        loaded: false
    };


    private componentDidMount() {
        this.setState({ loaded: true });
    }

    public render() {
        return this.state.loaded? <AddUserForm/> : <Loading/>
    }
}

export default AddUserView;