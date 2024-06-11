// user API

import { publicClient } from "constant";
import { LoginType, RegisterType } from "schemas";
import { ApiResponse } from "types";

export const userAPI = {
    signIn: (payload: LoginType): Promise<ApiResponse> => {
        return publicClient.post("/Users/signin", payload);
    },
    signUp: (payload: RegisterType): Promise<ApiResponse> => {
        return publicClient.post("/Users/signup", payload);
    },
};
