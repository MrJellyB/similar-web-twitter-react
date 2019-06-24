import React from "react";
import IUser from "../models/IUser";
import {Route, Switch} from 'react-router-dom';
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import {AuthContext} from "./Shared/Authenticator";
import ILoggedInUserContext from "../models/LoggedInUserContext";
import LogOut from "./Pages/LogOut";

interface Props {
    currentUser?: IUser
}

interface State {
}

export default class Routes extends React.Component<Props,State> {
    context!: React.ContextType<any>;

    render() {
        const {loggedInUser} = this.context as ILoggedInUserContext;
        if (loggedInUser == null) {
            return (
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/" component={Home}/>
                </Switch>
            );
        }
        else {
            // TODO: add paths here
            return (
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="/logout" component={LogOut} />
                </Switch>
            )
        }
    }
}

Routes.contextType = AuthContext;