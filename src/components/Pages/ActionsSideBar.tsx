import React from "react";
import IUser from "../../models/IUser";
import usersEventStore from "../../events/usersEventStore";
import {Link} from "react-router-dom";

interface IState {
    currentUser?: IUser
}

interface IProps {

}

export default class ActionsSideBar extends React.Component<IProps,IState> {
    constructor(props: IProps){
        super(props);

        this.state = {};
    }

    componentDidMount(): void {

        usersEventStore.currentUserEvent.subscribe(this.setCurrentUser);
    }

    setCurrentUser = (user: IUser|null) => {
        if(user != null)
            this.setState({
                currentUser: user
            });
    };

    render() {
        if(this.state.currentUser != null) {
            return <div>stam</div>;
        }
        else {
            return <div>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>;
        }
    }
}