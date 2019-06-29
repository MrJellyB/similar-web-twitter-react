import IUser from "./IUser";
import IPost from "./IPost";

export default interface IPostData {
    title: string;
    body: string;
    owner: IUser;
}