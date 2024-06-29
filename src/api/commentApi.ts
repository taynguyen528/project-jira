// comment API

import { privateClient, publicClient } from "constant";
import { ApiResponse, CommentType } from "types";

export const commentApi = {
    getAllComment: (taskId: number): Promise<ApiResponse<CommentType[]>> => {
        return publicClient.get(`/Comment/getAll?taskId=${taskId}`);
    },
    insertComment: (data: {
        taskId: number;
        contentComment: string;
    }): Promise<
        ApiResponse<{
            taskId: number;
            contentComment: string;
            id: number;
        }>
    > => {
        return privateClient.post("/Comment/insertComment", data);
    },
    deleteComment: (
        idComment: number
    ): Promise<ApiResponse<{ idComment: string }>> => {
        return privateClient.delete(
            `/Comment/deleteComment?idComment=${idComment}`
        );
    },
};
