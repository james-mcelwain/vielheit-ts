import * as React from 'react';
import Loading from './loading';
import AddUserForm from "../forms/add-user";

class AddUserView extends React.Component<{}, {loaded: boolean}>{
    private state = {
        loaded: false
    };


    private componentDidMount() {
        this.setState({ loaded: true });
    }

    private render() {
        return this.state.loaded? <AddUserForm/> : <Loading/>
    }
}

export default AddUserView;