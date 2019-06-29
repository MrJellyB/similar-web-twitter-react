import IUser from "./IUser";

export interface ILoggedInUser extends IUser {
    userId: string
}