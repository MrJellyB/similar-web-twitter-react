import React from "react";
import IUser from "../models/IUser";
import {Route, Switch} from 'react-router-dom';
import Home from "./Pages/Home";
import {AuthContext} from "./Shared/Authenticator";
import {Container} from "@material-ui/core";
import LogOut from "./Pages/LogOut";

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
                    <Route path="/logout" exact component={LogOut}/>
                </>
            );
        }
        else {
            routesToShow = (
                <>
                    <Route path="/" component={Home}/>
                </>
            )
        }

        return (
            <>
                <Container maxWidth={"sm"} >
                    <Switch>
                        {routesToShow}
                        {/*<Redirect from="*" to={"/"} />*/}
                    </Switch>
                </Container>
            </>
        );
    }
}

Routes.contextType = AuthContext;