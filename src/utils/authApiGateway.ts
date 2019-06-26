import ApiGateway from './apiGateway';
import ISignInData from "../models/signInData";
import IUser from "../models/IUser";
import ILoginData from "../models/loginData";
import {ILoggedInUser} from "../models/ILoggedInUser";

class AuthApiGateway {

    public async register(user: ISignInData): Promise<string> {
        return await ApiGateway.makeRequest<string, IUser, null>('auth', 'auth/register', "POST", user);
    }

    public async logIn(loginData: ILoginData): Promise<ILoggedInUser> {
        return await ApiGateway.makeRequest<ILoggedInUser, ILoginData, null>(
            'auth',
            'auth/login',
            "POST",
            loginData);
    }

    public async logOut(): Promise<void> {
        return await ApiGateway.makeRequest('auth', 'auth/logout', "GET");
    }

    public async getCurrentUserInfo(userId: string): Promise<IUser>{
        return await ApiGateway
            .makeRequest<IUser, null, {}>(
                'auth',
                'info/user',
                "GET",
                null,
                {userId: userId});
    }
}

export default new AuthApiGateway();