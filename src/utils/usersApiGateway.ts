import IFeed from "../models/IFeed";
import ApiGateway from './apiGateway';
import IFeedResponse, {IPostResponse} from "../models/IFeedResponse";
import IPost from "../models/IPost";

class UsersApiGateway {
    public async getUserFeed(userId: string): Promise<IFeed> {
        const responseFeed =  await ApiGateway.makeRequest<IFeedResponse, null, {}>(
            'users',
            'api/users/feed',
            'GET',
            null,
            { userId:userId }
        );

        const userFeed = {
            postList:
                responseFeed.posts
                    .filter((post: IPostResponse) =>{
                        return (post.owner != null &&
                                post.owner.displayName != null)
                    })
                    .map((post: IPostResponse) => {
                        return {
                            isLiked: false,
                            numberOfLikes: 0,
                            author: post.owner,
                            body: post.originalPost.body,
                            title: post.originalPost.title,
                        } as IPost
                    })
        } as IFeed;

        return userFeed;
    }
}

export default new UsersApiGateway();