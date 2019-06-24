import ApiGateway from './apiGateway';
import ISignInData from "../models/signInData";
import IUserToken from "../models/token";
import IUser from "../models/IUser";

class AuthApiGateway {

    public async register(user: ISignInData): Promise<void> {
        await ApiGateway.makeRequest<void, ISignInData>('auth', 'auth/register', "POST", user);
    }

    public async logIn(email: string, password: string): Promise<IUserToken> {
        return { userToken: "bla", userId: "bla" };
    }

    public async logOut(): Promise<void> {

    }

    public async getCurrentUserInfo(): Promise<IUser>{
        return await ApiGateway.makeRequest<IUser, void>('auth', 'auth/getUserInfo', "GET");
    }
}

export default new AuthApiGateway();