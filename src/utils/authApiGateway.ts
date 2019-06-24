import ApiGateway from './apiGateway';
import ISignInData from "../models/signInData";
import ITOKEN from "../models/token";

class AuthApiGateway {
    public async register(user: ISignInData): Promise<void> {
        await ApiGateway.makeRequest<void, ISignInData>('auth', 'auth/register', "POST", user);
    }

    public async logIn(email: string, password: string): Promise<ITOKEN> {
        return { userToken: "bla" };
    }

    // public async logOut()
}

export default new AuthApiGateway();