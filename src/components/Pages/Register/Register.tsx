import React from "react";
import ISignInData from "../../../models/signInData";
import authApiGateway from "../../../utils/authApiGateway";
import notificationEventStore from "../../../events/notificationEventStore";
import usersEventStore from "../../../events/usersEventStore";
import {Redirect} from "react-router";
import appConfig from "../../../utils/appConfig";
import {Button, FormControl, Icon, Input, Typography} from "@material-ui/core";
import styles from './Register.module.scss';

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

    handleInputChange= (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
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
        return true

    };

    submitUser = async (userToSubmit: ISignInData) : Promise<void> => {
        authApiGateway.register(userToSubmit)
            .then((userId:string) => {
                console.log("success");
                notificationEventStore.notifySuccess.next("User Registered Successfully");
                usersEventStore.currentUserEvent.next(userToSubmit);
                localStorage.setItem(appConfig.USERID_STORAGE_KEY, userId);
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
            <div className={styles.registerForm}>
                <Typography variant="h6" gutterBottom>
                    Register
                </Typography>

                <form onSubmit={this.handleSubmit}>
                    <FormControl>
                        <Input
                        name="email"
                        type="email"
                        placeholder="User Email..."
                        onChange={this.handleInputChange}
                        required={true}/>
                    </FormControl>
                    <FormControl>
                        <Input
                        name="firstName"
                        type="text"
                        placeholder="First Name..."
                        onChange={this.handleInputChange}
                        required={true}/>
                    </FormControl>
                    <FormControl>
                        <Input
                        name="lastName"
                        type="text"
                        placeholder="Last Name..."
                        onChange={this.handleInputChange}
                        required={true}/>
                    </FormControl>
                    <FormControl>
                        <Input
                            name="nickName"
                            type="text"
                            placeholder="Nickname..."
                            onChange={this.handleInputChange}
                        required={true}/>
                    </FormControl>
                    <FormControl>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password..."
                            onChange={this.handleInputChange}
                            required={true}/>
                    </FormControl>

                    <Button type="submit" value="submit" className={styles.submitButton}>
                        <Icon>send</Icon>
                    </Button>
                </form>
            </div>
        )
    }
}