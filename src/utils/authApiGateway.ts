import ApiGateway from './apiGateway';
import ISignInData from "../models/signInData";
import IUserSessionInfo from "../models/token";
import IUser from "../models/IUser";

class AuthApiGateway {

    public async register(user: ISignInData): Promise<string> {
        return await ApiGateway.makeRequest('auth', 'auth/register', "POST", user);
    }

    public async logIn(email: string, password: string): Promise<IUserSessionInfo> {
        return { userToken: "bla", userId: "bla" };
    }

    public async logOut(): Promise<void> {

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