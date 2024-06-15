import { privateClient, publicClient } from "constant";
import { ApiResponse, ContentProject, Task } from "types";

export const projectApi = {
    getAllProject: (): Promise<ApiResponse<ContentProject[]>> => {
        return publicClient.get("Project/getAllProject");
    },
    getProjectDetail: (id: number): Promise<ApiResponse<Task>> => {
        return privateClient.get(`Project/getProjectDetail?id=${id}`);
    },
};
