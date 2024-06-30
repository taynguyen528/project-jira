// task API
import { privateClient } from "constant";
import { ApiResponse, LstTaskDeTail, TaskTypeModel } from "types";

export const taskApi = {
    createTask: (
        formData: TaskTypeModel
    ): Promise<ApiResponse<TaskTypeModel>> => {
        return privateClient.post("/Project/createTask", formData);
    },
    getTaskDetail: (taskId: number): Promise<ApiResponse<LstTaskDeTail>> => {
        return privateClient.get(`/Project/getTaskDetail?taskId=${taskId}`);
    },
    removeTask: (taskId: number): Promise<ApiResponse<{ taskId: number }>> => {
        return privateClient.delete(`/Project/removeTask?taskId=${taskId}`);
    },
    updateTask: (
        formData: TaskTypeModel
    ): Promise<ApiResponse<TaskTypeModel>> => {
        return privateClient.post("/Project/updateTask", formData);
    },
    updateStatus: (data: {
        taskId: number;
        statusId: string;
    }): Promise<ApiResponse<{ taskId: number; statusId: string }>> => {
        return privateClient.put("/Project/updateStatus", data);
    },

};
