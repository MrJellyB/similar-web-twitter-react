import React from "react";
import IUser from "../../models/IUser";
import usersEventStore from "../../events/usersEventStore";
import ILoggedInUserContext from "../../models/LoggedInUserContext";

interface IState {
    currentUser: IUser
}

interface IProps {
    children: any
}

export const AuthContext = React.createContext<null|ILoggedInUserContext>(null);

export default class Authenticator extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {currentUser: {}};
    }

    componentDidMount(): void {
        usersEventStore.currentUserEvent.subscribe(this.handleUserChange)
    }

    handleUserChange = (user: IUser|null): void => {
        if(user != null)
            this.setState({
                currentUser: user
            });
    };

    render() {
        return (<AuthContext.Provider value={ { loggedInUser : this.state.currentUser } as ILoggedInUserContext}>
            {this.props.children}
        </AuthContext.Provider>);
    }
}