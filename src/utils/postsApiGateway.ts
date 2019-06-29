import ApiGateway from './apiGateway';
import IFeedCreationRequest from "../models/IFeedCreationRequest";
import {IPostRequest} from "../models/IPostRequest";

class PostsApiGateway {
    public async createFeedForUser(userId: string): Promise<void> {
        await ApiGateway.makeRequest<null, IFeedCreationRequest, null>(
            'posts',
            'api/feeds',
            'PUT',
            { RelatedToUser: userId } as IFeedCreationRequest);
    }

    public async sendPostOfUser(post: IPostRequest) : Promise<void> {
        await ApiGateway.makeRequest<null, IPostRequest, null>(
            'posts',
            'api/posts',
            'PUT',
            post
        )
    }
}

export default new PostsApiGateway();