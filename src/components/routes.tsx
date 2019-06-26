import React from "react";
import IUser from "../models/IUser";
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import {AuthContext} from "./Shared/Authenticator";
import LogOut from "./Pages/LogOut";
import Actions from "./Pages/ActionsSideBar/Actions";
import Login from "./Pages/Login";
import {Container} from "@material-ui/core";
import IconsSideBar from "./Pages/IconsSideBar/IconsSideBar";

interface Props {
    currentUser?: IUser
}

interface State {
}

export default class Routes extends React.Component<Props,State> {
    context!: React.ContextType<any>;

    render() {
        const loggedInUser = this.context as IUser;
        let routesToShow;

        if(loggedInUser != null) {
            routesToShow = (
                <>
                    <Route path="/" exact component={Home}/>
                    <Route path="/logout" exact component={LogOut} />
                </>
            );
        }
        else {
            routesToShow = (
                <>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Home}/>
                </>
            )
        }

        return (
            <>
                <Container maxWidth={"sm"} >
                    <Switch>
                        {routesToShow}
                        <Redirect from="*" to={"/"} />
                    </Switch>
                </Container>
            </>
        );
    }
}

Routes.contextType = AuthContext;