import React from "react";
import IPostData from "../../../models/IPostData";
import {Typography, FormControl, Input, Button, Icon} from "@material-ui/core";
import postApiGateway from "../../../utils/postsApiGateway";
import {Redirect} from "react-router";
import postsEventsStore from "../../../events/postsEventsStore";
import IPost from "../../../models/IPost";

interface IProps {
    userId: string
}

interface IState {
    post: IPostData
}

export default class SendPostForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            post: {
                title: "",
                body: "",
                userId: this.props.userId
            }
        }
    }

    handleInputChange= (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const target = event.currentTarget;
        const postFromInput = {
            ...this.state.post,
            [target.name]: target.value
        } as IPostData;

        this.setState({
            post: postFromInput
        } as IState);
    };

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();

        const postToSubmit = this.state.post;
        if(this.validateSubmit(postToSubmit))
            await this.onSubmit(postToSubmit);
        else
            console.log("user data is not valid");
    };

    onSubmit = async (post: IPostData) => {
        try {
            await postApiGateway.sendPostOfUser(post);
            const postToStoreLocally:IPost = post as IPost;
            postToStoreLocally.isLiked = false;
            postToStoreLocally.numberOfLikes = 0;

            postsEventsStore.onPostSubmitted.next(postToStoreLocally);
            this.onRedirect();
        }
        catch(error) {
            console.log("failure" + error);
            // TODO: use redux or rxjs to notify failure to the user
        }

    };

    onRedirect = () => {
        return <Redirect to={"/"} />;
    };

    validateSubmit = (postData: IPostData) : boolean => {

        return Object.values(postData).every((fieldValue:string) => {
            const validValueRegex = /['"\\]/g;
            return !validValueRegex.test(fieldValue);
        });
    };

    render() {
        return (
            <div>
            <Typography variant="h6" gutterBottom>
                New Post!
            </Typography>

            <form onSubmit={this.handleSubmit}>
                <FormControl component={"div"}>
                    <Input
                        name={"title"}
                        type={"text"}
                        onChange={this.handleInputChange}
                        required={true}
                        placeholder={"Title"}
                    />
                </FormControl>

                <FormControl component={"div"}>
                    <Input
                        name={"body"}
                        type={"textarea"}
                        onChange={this.handleInputChange}
                        required={true}
                        placeholder={"Content"}
                    />
                </FormControl>

                <Button type={"submit"} value={"send"} href={undefined}>
                    <Icon>send</Icon>
                </Button>
            </form>
        </div>);
    }
}
