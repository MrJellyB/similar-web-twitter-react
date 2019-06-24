interface IMicroserviceConfig {
    name: string;
    url: string
}

class AppConfig {
    public readonly TOKEN_STORAGE_KEY: string = process.env.REACT_APP_TOKEN_STORAGE_KEY || "LOCAL::TOKENS";
    public readonly BASE_URL: string|undefined = process.env.REACT_APP_BASE_URL || "http://localhost";
    public readonly MICROSERVICES: {[path: string]: IMicroserviceConfig} = {}; // TODO: add this to env config file of json

    constructor() {
        const microservicesEnvKeys = Object.keys(process.env).filter(key => key.includes("MICROSERVICES"));
        if(microservicesEnvKeys === [])
            return;

        this.MICROSERVICES = {};
        microservicesEnvKeys.forEach((microserviceKey:string) => {
            const serviceNameParts = microserviceKey.split('_');
            const serviceName = serviceNameParts[serviceNameParts.length - 1];
            this.MICROSERVICES[serviceName.toLowerCase()] =
                {
                    url: process.env[microserviceKey] as string,
                    name: serviceName
                };
        })
    }
}

export default new AppConfig()