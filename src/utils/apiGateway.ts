import axios, {AxiosInstance, AxiosResponse} from 'axios';
import AppConfig from './appConfig';
import usersEventStore from "../events/usersEventStore";

class ApiGateway {
    private readonly DEFAULT_HEADERS = {
        "Content-Type": "application/json",
        "put": {
            "Content-Type": "application/json"
        }
    };

    private readonly axiosClient: AxiosInstance = axios.create({
        baseURL: AppConfig.BASE_URL
    });

    private readonly TOKEN_HEADER = 'token';

    constructor() {

        this.axiosClient.interceptors.request.use(
            (request) => {
                const userToken = localStorage.getItem(AppConfig.TOKEN_STORAGE_KEY);

                if (userToken != null) {
                    request.headers[this.TOKEN_HEADER] = userToken;
                }

                return request;
            }
        );


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
                    // const tokenToStore = userToken.substring("Bearer ".length);
                    localStorage.removeItem(AppConfig.TOKEN_STORAGE_KEY);
                    localStorage.setItem(AppConfig.TOKEN_STORAGE_KEY, userToken);
                }

                return response;
            }
        );

        usersEventStore.userLogOutEvent.subscribe(this.removeUserTokenFromLocalStorage);
    }

    private removeUserTokenFromLocalStorage = () => {
        localStorage.removeItem(AppConfig.TOKEN_STORAGE_KEY);
    };

    public async makeRequest<R, B, P>(service: string, path: string, method:'GET'|'POST'|'PUT', requestData?: B, requestParams?: P): Promise<R>{
        console.log(AppConfig.MICROSERVICES_TO_URLS);
        const {data} = await this.axiosClient({
            baseURL: AppConfig.MICROSERVICES_TO_URLS[service].url + "/" + path,
            method: method,
            data: requestData,
            params: requestParams,
            headers: this.DEFAULT_HEADERS
        }) as AxiosResponse<R>;

        return data;
    }
}

export default new ApiGateway();


