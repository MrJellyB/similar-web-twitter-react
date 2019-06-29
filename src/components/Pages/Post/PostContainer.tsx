import React from "react";
import PostContent from "./PostContent";
import IPost from "../../../models/IPost";
import styles from "./PostContainer.module.scss";

interface IProps {
    post: IPost
}

interface IState {
}

export default class PostContainer extends React.Component<IProps, IState> {
    render() {
        return (
            <div className={styles.postContainer}>
                <PostContent post={this.props.post}/>
            </div>
        );
    }
}