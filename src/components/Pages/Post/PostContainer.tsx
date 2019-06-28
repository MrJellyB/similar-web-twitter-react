import React from "react";
import PostContent from "./PostContent";
import IPost from "../../../models/IPost";

interface IProps {
    post: IPost
}

interface IState {
}

export default class PostContainer extends React.Component<IProps, IState> {
    render() {
        return (
            <div>
                <PostContent post={this.props.post} />
            </div>
        );
    }
}