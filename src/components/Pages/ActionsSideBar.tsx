import React from "react";
import IUser from "../../models/IUser";
import {Link} from "react-router-dom";
import {AuthContext} from "../Shared/Authenticator";
import ILoggedInUserContext from "../../models/LoggedInUserContext";

interface IState {
    currentUser?: IUser
}

interface IProps {

}

export default class ActionsSideBar extends React.Component<IProps,IState> {
    context!: React.ContextType<any>;

    render() {
        console.log(this.context);
        const {loggedInUser} = this.context as ILoggedInUserContext;
        if(loggedInUser != null) {
            return <div>
                <Link to="/post">Post a new Tweet</Link>
                <Link to="/personal-feed">My Feed</Link>
                <Link to="/global-feed">Everyone's Feed</Link>
                <Link to="/user-settings">User Settings</Link>
                <Link to="/logout">Logout</Link>
            </div>;
        }
        else {
            return <div>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>;
        }
    }
}


ActionsSideBar.contextType = AuthContext;