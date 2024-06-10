import axios from "axios";
import qs from "query-string";
import { BASE_URL, TOKEN_CYBERSOFT } from "./configUrlApi";

// privateClient
export const privateClient = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: {
        serialize: (params) => qs.stringify(params),
    },
});

privateClient.interceptors.request.use(
    (config) => {
        if (!config.headers) {
            config.headers = new axios.AxiosHeaders();
        }

        config.headers.set("TokenCybersoft", TOKEN_CYBERSOFT);
        config.headers.set("Content-Type", "application/json");
        const token = localStorage.getItem("TOKEN");
        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

privateClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// publicClient
export const publicClient = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: {
        serialize: (params) => qs.stringify(params),
    },
});

publicClient.interceptors.request.use(
    (config) => {
        if (!config.headers) {
            config.headers = new axios.AxiosHeaders();
        }
        
        config.headers.set("TokenCybersoft", TOKEN_CYBERSOFT);
        config.headers.set("Content-Type", "application/json");

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

publicClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
