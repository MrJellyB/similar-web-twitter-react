import React from "react";
import authApiGateway from "../../utils/authApiGateway";
import notificationEventStore from "../../events/notificationEventStore";
import usersEventStore from "../../events/usersEventStore";
import {Redirect} from "react-router";
import appConfig from "../../utils/appConfig";
import ILoginData from "../../models/loginData";
import {ILoggedInUser} from "../../models/ILoggedInUser";

interface IProps {
}

interface IState {
    user: ILoginData;
}

export default class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            user: {
                email: "",
                password: ""
            } as ILoginData
        };
    }

    handleInputChange= (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        const userFromInput = {
            ...this.state.user,
            [target.name]: target.value
        } as ILoginData;

        this.setState({
            user: userFromInput
        } as IState);
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userToSubmit = this.state.user;
        if(this.validateSubmit(userToSubmit))
            this.submitLogin(userToSubmit);
        else
            console.log("user data is not valid");
    };

    validateSubmit = (userToValidate: ILoginData) : boolean => {
        return  Object.values(userToValidate).every(key => key !== "");
    };

    submitLogin = (loginData: ILoginData) => {
        authApiGateway.logIn(loginData)
            .then((loggedInUser: ILoggedInUser) => {
                console.log("success");
                notificationEventStore.notifySuccess.next("Login Successful");
                usersEventStore.currentUserEvent.next(loggedInUser);
                localStorage.setItem(appConfig.USERID_STORAGE_KEY, loggedInUser.uid);
                this.renderRedirect();
            })
            .catch((error) => {
                console.log("failure" + error);
                // TODO: use redux or rxjs to notify failure to the user
            })

    };

    renderRedirect = () => {
        return <Redirect to='/' />;
    };

    render () {
        return (
            <div className={""}>
                <h1>Login</h1>

                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter User Email..."
                        onChange={this.handleInputChange} />
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter Password..."
                        onChange={this.handleInputChange} />

                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}