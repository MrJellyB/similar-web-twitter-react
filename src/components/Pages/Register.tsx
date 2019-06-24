import React from "react";
import ISignInData from "../../models/signInData";
import authApiGateway from "../../utils/authApiGateway";
import notificationEventStore from "../../events/notificationEventStore";
import usersEventStore from "../../events/usersEventStore";
import {Redirect} from "react-router";

interface IProps {
}

interface IState {
    user: ISignInData;
}

export default class Register extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            user: {
                email: "",
                firstName: "",
                lastName: "",
                nickName: "",
                password: ""
            } as ISignInData
        };
    }

    handleInputChange= (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        const userFromInput = {
            ...this.state.user,
            [target.name]: target.value
        } as ISignInData;

        this.setState({
            user: userFromInput
        } as IState);
    };

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();

        const userToSubmit = this.state.user;
        if(this.validateSubmit(userToSubmit))
            await this.submitUser(userToSubmit);
        else
            console.log("user data is not valid");
    };

    validateSubmit = (userToValidate: ISignInData) : boolean => {
        return  Object.values(userToValidate).every(key => key !== "");
    };

    submitUser = async (userToSubmit: ISignInData) : Promise<void> => {
        console.log("now we need to do submit with token");

        authApiGateway.register(userToSubmit)
            .then(() => {
                console.log("success");
                notificationEventStore.notifySuccess.next("User Register Successfully");
                usersEventStore.currentUserEvent.next(userToSubmit);
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
                <h1>Register</h1>

                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter User Email..."
                        onChange={this.handleInputChange} />
                    <input
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name..."
                        onChange={this.handleInputChange} />
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Enter Last Name..."
                        onChange={this.handleInputChange} />
                    <input
                        name="nickName"
                        type="text"
                        placeholder="Enter User Nickname..."
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