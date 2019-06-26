import React from "react";
import IUser from "../../models/IUser";
import usersEventStore from "../../events/usersEventStore";
import AppConfig from "../../utils/appConfig";
import authApiGateway from "../../utils/authApiGateway";

interface IState {
    currentUser: IUser|null
}

interface IProps {
    children: any
}

export const AuthContext = React.createContext<null|IUser>(null);

export default class Authenticator extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {currentUser: null};
    }

    componentDidMount(): void {
        const currentUser = usersEventStore.currentUserEvent.value;
        usersEventStore.currentUserEvent.subscribe(this.handleUserChange);

        const userTokenFromStorage = localStorage.getItem(AppConfig.TOKEN_STORAGE_KEY);
        const userIdFromStorage = localStorage.getItem(AppConfig.USERID_STORAGE_KEY);

        if (currentUser == null && (userTokenFromStorage != null && userIdFromStorage != null))
            authApiGateway.getCurrentUserInfo(userIdFromStorage)
                .then((user: IUser) => {
                    usersEventStore.currentUserEvent.next(user);
                });
    }

    handleUserChange = (user: IUser|null): void => {
        // if(user != null)
            this.setState({
                currentUser: user
            });
    };

    render() {
        return (<AuthContext.Provider value={ this.state.currentUser as IUser}>
            {this.props.children}
        </AuthContext.Provider>);
    }
}