import * as React from "react";
import IPost from "../../../models/IPost";
import postsEventsStore from "../../../events/postsEventsStore";
import usersEventsStore from "../../../events/usersEventStore";
import PostContainer from "../Post/PostContainer";
import IFeed from "../../../models/IFeed";
import usersApiGateway from "../../../utils/usersApiGateway";
import {ILoggedInUser} from "../../../models/ILoggedInUser";

interface IProps {

}

interface IState {
    postCounter: number,
    feed: IFeed
}

export class UserFeed extends React.Component<IProps,IState> {
    context!: React.ContextType<any>;

    constructor(props: IProps) {
        super(props);

        this.state = {
            postCounter: 0,
            feed : {
                postList: []
            }
        }
    }

    async componentDidMount(): Promise<void> {
        postsEventsStore.onPostSubmitted.subscribe((post: IPost|null) => {
            if(post == null)
                return;

            this.addPostToFeed(post);
        });

        usersEventsStore.currentUserEvent.subscribe(async currentUser => {
            if(currentUser == null)
                return;

            const {userId} = currentUser as ILoggedInUser;
            this.setFeed(await usersApiGateway.getUserFeed(userId));
        });
    }

    setFeed = (feed: IFeed) => {
        this.setState({
            feed: feed
        })
    };


    addPostToFeed = (post: IPost) => {
        this.setState({
            postCounter: this.state.postCounter + 1,
            feed:{ postList: [...this.state.feed.postList, post] } as IFeed
        })
    };

    render() {
        const listOfPosts = this.state.feed.postList.map((post: IPost, index )=> {
            return (<PostContainer post={post} key={index} />);
        });

        return (
            <>
                {listOfPosts}
            </>
        )
    }
}