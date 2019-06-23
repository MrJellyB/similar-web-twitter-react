import React from "react";
import IUser from "../../models/user";

interface IProps {
}

interface IState {
    user: IUser;
}

export default class Register extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            user: {
                email: "",
                firstName: "",
                lastName: "",
                nickName: ""
            }
        };
    }

    handleInputChange= (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        const userFromInput = {
            ...this.state.user,
            [target.name]: target.value
        } as IUser;

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

    validateSubmit = (userToValidate: IUser) : boolean => {
        return (
            userToValidate.email != null &&
            userToValidate.nickName != null &&
            userToValidate.lastName != null &&
            userToValidate.firstName != null
        )
    };

    submitUser = async (userToSubmit: IUser) : Promise<void> => {
        console.log("now we need to do submit with token");


    };

    render () {
        return (
            <>
                <h1>Register</h1>

                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="User Email"
                        onChange={this.handleInputChange} />
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={this.handleInputChange} />
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        onChange={this.handleInputChange} />
                    <input
                        name="nickname"
                        type="text"
                        placeholder="User Nickname"
                        onChange={this.handleInputChange} />

                    <input type="submit" value="submit"/>
                </form>
            </>
        )
    }
}