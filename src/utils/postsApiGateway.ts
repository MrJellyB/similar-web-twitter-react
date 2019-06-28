import ApiGateway from './apiGateway';
import IFeedCreationRequest from "../models/IFeedCreationRequest";
import IPostData from "../models/IPostData";

class PostsApiGateway {
    public async createFeedForUser(userId: string): Promise<void> {
        await ApiGateway.makeRequest<null, IFeedCreationRequest, null>(
            'posts',
            'api/feeds',
            'PUT',
            { RelatedToUser: userId } as IFeedCreationRequest);
    }

    public async sendPostOfUser(post: IPostData) : Promise<void> {

    }
}

export default new PostsApiGateway();