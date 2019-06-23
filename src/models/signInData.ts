import IUser from "./IUser";

export default interface ISignInData extends IUser {
    password: string;
}