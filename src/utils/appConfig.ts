interface IMicroserviceConfig {
    name: string;
    url: string
}

class AppConfig {
    public readonly TOKEN_STORAGE_KEY: string = process.env.REACT_APP_TOKEN_STORAGE_KEY || "LOCAL::TOKENS";
    public readonly BASE_URL: string|undefined = process.env.REACT_APP_BASE_URL || "http://localhost";
    public readonly MICROSERVICES: {[path: string]: IMicroserviceConfig} = {}; // TODO: add this to env config file of json

    constructor() {
        if(process.env.REACT_APP_MICTROSERVICES_PROXY == null)
            return;

        const microservicesToUrls =
            JSON.parse(process.env.REACT_APP_MICTROSERVICES_PROXY) as IMicroserviceConfig[];

        microservicesToUrls.forEach((microservice) => {
            this.MICROSERVICES[microservice.name] = {
                name: microservice.name,
                url: microservice.url
            };

        });
    }
}

export default new AppConfig()