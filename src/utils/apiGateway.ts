import IAPP_TOKEN_STORAGE_KEY from '../models/token';
import axios, {AxiosResponse} from 'axios';
import tokenProvider from 'axios-token-interceptor';

class ApiGateway {
    readonly TOKEN_STORAGE_KEY: string = process.env.REACT_APP_TOKEN_STORAGE_KEY as string;
    readonly BASE_URL: string|undefined = process.env.REACT_APP_BASE_URL;
    readonly axiosClient = axios.create({
        baseURL: this.BASE_URL
    });
    private token:string;

    constructor() {
        this.token = "";

        if(this.TOKEN_STORAGE_KEY != null) {
            const tokenStore = localStorage.getItem(this.TOKEN_STORAGE_KEY) as string;

            if (tokenStore != null) {
                const {token} = JSON.parse(tokenStore);
                this.token = token;
            }
        }

        this.axiosClient.interceptors.request.use(tokenProvider({
            token: this.token
        }));

        this.axiosClient.interceptors.response.use(
            (promise)=> {
                const {token} = promise.headers;
                localStorage.setItem(this.TOKEN_STORAGE_KEY, token);

                return promise;
            }
        )
    }

    public async makeRequest<R, D>(path: string, method:'GET'|'POST', requestData: D): Promise<R>{
        const {data} = await this.axiosClient({
            url: path,
            method: method,
            data: requestData,
        }) as AxiosResponse<R>;

        return data;
    }
}

export default new ApiGateway();


