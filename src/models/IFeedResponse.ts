import IPostData from "./IPostData";
import IUser from "./IUser";

export default interface IFeedResponse {
    posts: IPostResponse[];
}

export interface IPostResponse {
    originalPost: IPostData,
    owner: IUser
}