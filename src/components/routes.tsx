import React from "react";
import IUser from "../models/IUser";
import {Route, Switch} from 'react-router-dom';
import Home from "./Pages/Home";
import Register from "./Pages/Register";

interface Props {
    currentUser?: IUser
}

interface State {
}

export default class Routes extends React.Component<Props,State> {
    render() {
        if (!this.props.currentUser) {
            return (
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="/register" component={Register} />
                </Switch>
            );
        }
    }
}
