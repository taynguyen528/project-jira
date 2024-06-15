import { publicClient } from "constant";
import { ApiResponse, ContentProject } from "types";

export const projectApi = {
    getAllProject: (): Promise<ApiResponse<ContentProject[]>> => {
        return publicClient.get("/Project/getAllProject");
    },
};
