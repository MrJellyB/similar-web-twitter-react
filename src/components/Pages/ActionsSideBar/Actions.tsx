import React from "react";
import IUser from "../../../models/IUser";
import {Link} from "react-router-dom";
import {AuthContext} from "../../Shared/Authenticator";
import IconsSideBar from "../IconsSideBar/IconsSideBar";
import IconNavAction from "../IconNavAction/IconNavAction";

interface IState {
    currentUser?: IUser
}

interface IProps {

}

export default class Actions extends React.Component<IProps,IState> {
    context!: React.ContextType<any>;

    render() {
        console.log(this.context);
        const loggedInUser = this.context as IUser;
        let actionsToShow;
        
        if(loggedInUser != null) {
            actionsToShow = ( <>
                <IconNavAction icon={"send"} path={"post"} title={"post"} />
                <IconNavAction icon={"list"} path={"/personal-feed"} title={"My Feed"}/>
                <IconNavAction icon={"public"} path={"/global-feed"} title={"Everyone's Feed"}/>
                <IconNavAction icon={"exit_to_app"} path={"/logout"} title={"Logout"} />
            </>);
        }
        else {
            actionsToShow = (
                <>
                    <IconNavAction icon={"person"} path={"/register"} title={"Register"} />
                    <IconNavAction icon={"arrow_forward"} path={"/login"} title={"Login"} />
                </>
            );
        }

        return (<>
            <IconsSideBar>
                {actionsToShow}
            </IconsSideBar>
        </>);
    }
}

Actions.contextType = AuthContext;