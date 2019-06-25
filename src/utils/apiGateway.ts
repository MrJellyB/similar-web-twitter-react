import axios, {AxiosInstance, AxiosResponse} from 'axios';
import tokenProvider from 'axios-token-interceptor';
import AppConfig from './appConfig';
import usersEventStore from "../events/usersEventStore";

class ApiGateway {
    private readonly axiosClient: AxiosInstance = axios.create({
        baseURL: AppConfig.BASE_URL
    });

    private readonly TOKEN_HEADER = 'token';

    constructor() {

        this.axiosClient.interceptors.request.use(tokenProvider({
            getToken: () => {
                const tokenStorageValue = localStorage.getItem(AppConfig.TOKEN_STORAGE_KEY) as string;

                console.log(tokenStorageValue);
                return tokenStorageValue || "";
            },
            header: this.TOKEN_HEADER
        }));


        // TODO: Maybe we need userid?
        // this.axiosClient.interceptors.request.use(
        //     (request) => {
        //         const useridStorageValue = localStorage.getItem(AppConfig.USERID_STORAGE_KEY);
        //
        //         if (useridStorageValue != null) {
        //             request.headers['x-userid'] = useridStorageValue;
        //         }
        //
        //         return request;
        //     }
        // );

        this.axiosClient.interceptors.response.use(
            (response)=> {

                if(response.headers[this.TOKEN_HEADER] == null)
                    return response;

                const userToken = response.headers[this.TOKEN_HEADER] as string;

                if (userToken != null) {
                    const tokenToStore = userToken.substring("Bearer ".length);
                    localStorage.setItem(AppConfig.TOKEN_STORAGE_KEY, tokenToStore);
                }

                return response;
            }
        );

        usersEventStore.userLogOutEvent.subscribe(this.removeUserTokenFromLocalStorage);
    }

    private removeUserTokenFromLocalStorage = () => {
        localStorage.removeItem(AppConfig.TOKEN_STORAGE_KEY);
    };

    public async makeRequest<R, B, P>(service: string, path: string, method:'GET'|'POST', requestData?: B, requestParams?: P): Promise<R>{
        console.log(AppConfig.MICROSERVICES_TO_URLS);
        const {data} = await this.axiosClient({
            baseURL: AppConfig.MICROSERVICES_TO_URLS[service].url + "/" + path,
            method: method,
            data: requestData,
            params: requestParams
        }) as AxiosResponse<R>;

        return data;
    }
}

export default new ApiGateway();


