export type CommentType = {
    user: UserComment;
    id?: number;
    userId: number;
    taskId: number;
    contentComment: string;
    deleted: boolean;
    alias: string;
};

export type UserComment = {
    userId: number;
    name: string;
    avatar: string;
};
