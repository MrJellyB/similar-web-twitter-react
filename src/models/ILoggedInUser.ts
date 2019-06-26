import IUser from "./IUser";

export interface ILoggedInUser extends IUser {
    uid: string
}