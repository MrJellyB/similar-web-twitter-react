import ApiGateway from './apiGateway';
import IFeedCreationRequest from "../models/IFeedCreationRequest";

class PostsApiGateway {
    public async createFeedForUser(userId: string): Promise<void> {
        await ApiGateway.makeRequest<null, IFeedCreationRequest, null>(
            'posts',
            'api/feeds',
            'PUT',
            { RelatedToUser: userId } as IFeedCreationRequest);
    }

    public async sendPostOfUser(userId: string) : Promise<void> {

    }
}

export default new PostsApiGateway();