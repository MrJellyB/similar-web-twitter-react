import ITOKEN from '../models/token';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import tokenProvider from 'axios-token-interceptor';
import AppConfig from './appConfig';

class ApiGateway {
    readonly axiosClient: AxiosInstance = axios.create({
        baseURL: AppConfig.BASE_URL
    });
    private token:ITOKEN;

    constructor() {
        this.token = { userToken: "" };

        if(AppConfig.TOKEN_STORAGE_KEY != null) {
            const tokenStore = localStorage.getItem(AppConfig.TOKEN_STORAGE_KEY) as string;

            if (tokenStore != null) {
                this.token = JSON.parse(tokenStore) as ITOKEN;
            }
        }

        this.axiosClient.interceptors.request.use(tokenProvider({
            token: this.token.userToken
        }));

        this.axiosClient.interceptors.response.use(
            (promise)=> {
                const {token} = promise.headers;
                localStorage.setItem(AppConfig.TOKEN_STORAGE_KEY, token);

                return promise;
            }
        )
    }

    public async makeRequest<R, D>(path: string, method:'GET'|'POST', requestData: D): Promise<R>{
        const {data} = await this.axiosClient({
            baseURL: AppConfig.MICROSERVICES[path].url,
            url: path,
            method: method,
            data: requestData
        }) as AxiosResponse<R>;

        return data;
    }
}

export default new ApiGateway();


