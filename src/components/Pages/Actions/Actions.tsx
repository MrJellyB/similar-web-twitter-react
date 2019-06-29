import React from "react";
import IUser from "../../../models/IUser";
import {AuthContext} from "../../Shared/Authenticator";
import IconsSideBar from "../IconsSideBar/IconsSideBar";
import IconNavAction from "../IconNavAction/IconNavAction";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SendPostForm from "../Post/SendPostForm";
import {ILoggedInUser} from "../../../models/ILoggedInUser";

interface IState {
    currentUser?: IUser
}

interface IProps {

}

export default class Actions extends React.Component<IProps,IState> {
    context!: React.ContextType<any>;

    render() {
        console.log(this.context);
        const loggedInUser = this.context as ILoggedInUser;
        let actionsToShow;
        
        if(loggedInUser != null) {
            actionsToShow = ( <>
                <IconNavAction icon={"send"} title={"post"} >
                    <SendPostForm userId={loggedInUser.userId} />
                </IconNavAction>
                <IconNavAction icon={"list"} path={"/feed/personal"} title={"My Feed"}/>
                <IconNavAction icon={"public"} path={"/feed/global"} title={"Global Feed"}/>
                <IconNavAction icon={"exit_to_app"} path={"/logout"} title={"Logout"} />
            </>);
        }
        else {
            actionsToShow = (
                <>
                    <IconNavAction icon={"person"} title={"Register"}  >
                        <Register/>
                    </IconNavAction>
                    <IconNavAction icon={"arrow_forward"} title={"Login"} >
                        <Login />
                    </IconNavAction>
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