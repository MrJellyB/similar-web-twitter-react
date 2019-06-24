import React from "react";
import usersEventStore from "../../events/usersEventStore";
import authApiGateway from "../../utils/authApiGateway";

export default class LogOut extends React.Component {

    async componentDidMount(): Promise<void> {
        await authApiGateway.logOut();
        usersEventStore.userLogOutEvent.next();
        usersEventStore.currentUserEvent.next(null);
    }

    render() {
        return <div>Logging Out Now..</div>;
    }
}
