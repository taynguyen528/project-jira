// task API

import { privateClient } from "constant";
import { ApiResponse, CreateTaskType } from "types";

export const taskApi = {
    createTask: (
        formData: CreateTaskType
    ): Promise<ApiResponse<CreateTaskType>> => {
        return privateClient.post("/Project/createTask", formData);
    },
};
