export type ApiResponse<T> = {
    content: T;
    message: string;
    statusCode: number;
};