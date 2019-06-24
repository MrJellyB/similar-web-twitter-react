import React from "react";
import IUser from "../../models/IUser";
import usersEventStore from "../../events/usersEventStore";
import ILoggedInUserContext from "../../models/LoggedInUserContext";
import IUserToken from "../../models/token";
import AppConfig from "../../utils/appConfig";
import authApiGateway from "../../utils/authApiGateway";

interface IState {
    currentUser: IUser|null
}

interface IProps {
    children: any
}

export const AuthContext = React.createContext<null|ILoggedInUserContext>(null);

export default class Authenticator extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {currentUser: null};
    }

    componentDidMount(): void {
        const currentUser = usersEventStore.currentUserEvent.value;
        usersEventStore.currentUserEvent.subscribe(this.handleUserChange);

        const userTokenFromStorage = this.getLocalUserToken();

        if(currentUser == null && userTokenFromStorage != null)
            authApiGateway.getCurrentUserInfo()
                .then(usersEventStore.currentUserEvent.next);
    }

    getLocalUserToken = (): IUserToken|null => {
        const userFromStorage = localStorage.getItem(AppConfig.TOKEN_STORAGE_KEY);

        return userFromStorage != null ? JSON.parse(userFromStorage) as IUserToken : null;
    };

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