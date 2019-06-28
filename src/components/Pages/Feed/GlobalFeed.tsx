import * as React from "react";
import IPost from "../../../models/IPost";
import postsEventsStore from "../../../events/postsEventsStore";
import PostContainer from "../Post/PostContainer";

interface IProps {

}

interface IState {
    postCounter: number,
    postList: IPost[]
}

export class GlobalFeed extends React.Component<IProps,IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            postCounter: 0,
            postList : []
        }
    }

    componentDidMount(): void {
        postsEventsStore.onPostSubmitted.subscribe((post: IPost|null) => {
            if(post == null)
                return;

            this.addPostToFeed(post);
        });
    }

    addPostToFeed = (post: IPost) => {
        this.setState({
            postCounter: this.state.postCounter + 1,
            postList: [...this.state.postList, post]
        })
    };

    render() {
        const listOfPosts = this.state.postList.map((post: IPost,index )=> {
            return (<PostContainer post={post} key={index} />);
        });

        return (
            <>
                {listOfPosts}
            </>
        )
    }
}