import ApiGateway from './apiGateway';
import ISignInData from "../models/signInData";

class AuthApiGateway {
    public async register(user: ISignInData): Promise<void> {
        await ApiGateway.makeRequest<void, ISignInData>('auth', 'auth/register', "POST", user);
    }
}

export default new AuthApiGateway();