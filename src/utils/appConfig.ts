interface IMicroserviceConfig {
    name: string;
    url: string
}

class AppConfig {
    public readonly TOKEN_STORAGE_KEY: string = process.env.REACT_APP_TOKEN_STORAGE_KEY || "LOCAL::TOKENS";
    public readonly BASE_URL: string|undefined = process.env.REACT_APP_BASE_URL || "http://localhost";
    public readonly MICROSERVICES_TO_URLS: {[path: string]: IMicroserviceConfig} = {}; // TODO: add this to env config file of json
    public readonly USERID_STORAGE_KEY: string = process.env.REACT_APP_USERID_STORAGE_KEY || "LOCAL::USERID";

    constructor() {
        const microservicesEnvKeys = Object.keys(process.env).filter(key => key.includes("REACT_APP_MICROSERVICES"));
        if(microservicesEnvKeys === [])
            return;

        this.MICROSERVICES_TO_URLS = {};

        microservicesEnvKeys.forEach((microserviceKey:string) => {
            const serviceNameParts = microserviceKey.split('_');
            const serviceName = serviceNameParts[serviceNameParts.length - 1];
            this.MICROSERVICES_TO_URLS[serviceName.toLowerCase()] =
                {
                    url: process.env[microserviceKey] as string,
                    name: serviceName
                };
        })
    }
}

export default new AppConfig()