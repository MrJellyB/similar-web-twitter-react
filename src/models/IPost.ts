import IPostData from "./IPostData";
import IUser from "./IUser";

export default interface IPost extends IPostData {
    isLiked: boolean;
    numberOfLikes: number;
    author: IUser;
}