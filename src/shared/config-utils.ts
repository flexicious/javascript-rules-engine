
import { ConfigJson } from "@euxdt/node-rules-engine";
import { getNodeJsConfigApi, ConfigApi } from "@euxdt/node-rules-engine";
import configJson from "../config.json";


// This is the config json that we would normally get from the lambda genie console  
// we are just hard coding it here for the sake of the demo
// In a real world scenario, this would be loaded from the url or an api

export const loadConfigApi = async (lambdaName:string):Promise<ConfigApi> => {
    const configApi = await getNodeJsConfigApi(
        {
            lambdaName,
            cacheDurationSeconds: 60,
            loadConfig: async (lastRefreshed?:Date, existingConfig?:ConfigJson) => {
                //this is called every time the cache expires
                //you can call out to an api here. It will only be called once every minute
                console.log("Loading config");
                const result = (configJson);
                return result as unknown as ConfigJson;
            },
            log: (level, message, extra) => {
                console.log(level, message, extra);
            }
        }
    );
    return configApi;
};




