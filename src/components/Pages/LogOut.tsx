import React from "react";
import usersEventStore from "../../events/usersEventStore";
import authApiGateway from "../../utils/authApiGateway";
import {Redirect} from "react-router";

export default class LogOut extends React.Component {

    async componentDidMount(): Promise<void>{
        await authApiGateway.logOut();
        usersEventStore.userLogOutEvent.next();
        usersEventStore.currentUserEvent.next(null);
        this.renderRedirect();
    }

    renderRedirect = () => {
        return <Redirect to='/' />;
    };

    render() {
        return <div>Logging Out Now..</div>;
    }
}
