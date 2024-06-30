import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { commentApi } from "api";
import { RootState } from "store";
import { CommentType } from "types";
import { showDeleteConfirm } from "./ConfirmDelete";

interface ModalCommentProps {
    taskId: number;
}

export const CommentComponent: React.FC<ModalCommentProps> = ({ taskId }) => {
    const { userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );
    const [listComment, setListComment] = useState<CommentType[]>([]);
    const [contentComment, setContentComment] = useState<string>("");
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [editCommentContent, setEditCommentContent] = useState<string>("");

    const fetchDataComment = async () => {
        try {
            const res = await commentApi.getAllComment(taskId);
            if (res && res.statusCode === 200) {
                setListComment(res.content);
            }
        } catch (error: any) {
            console.log(error.response.data.content);
        }
    };

    useEffect(() => {
        fetchDataComment();
    }, [taskId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContentComment(event.target.value);
    };

    const handleEditInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditCommentContent(event.target.value);
    };

    const handleBtnEditComment = (
        commentId: number | undefined,
        content: string
    ) => {
        if (commentId !== undefined) {
            setEditCommentId(commentId);
            setEditCommentContent(content);
        }
    };

    const handleBtnSubmitComment = async () => {
        if (!contentComment.trim()) return;

        try {
            const res = await commentApi.insertComment({
                taskId,
                contentComment,
            });

            if (res && res.statusCode === 200) {
                toast.success("Bình luận thành công.");
                const newComment: CommentType = {
                    id: res.content.id,
                    userId: userLogin.userId,
                    taskId: taskId,
                    contentComment: res.content.contentComment,
                    deleted: false,
                    alias: res.content.contentComment,
                    user: {
                        userId: userLogin.userId,
                        name: userLogin.name,
                        avatar: userLogin.avatar,
                    },
                };

                setListComment((prevComments) => [...prevComments, newComment]);

                setContentComment("");
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleBtnSaveEditComment = async () => {
        try {
            if (editCommentId) {
                const res = await commentApi.updateComment(
                    editCommentId,
                    editCommentContent
                );
                if (res && res.statusCode === 200) {
                    toast.success(res.message);
                    fetchDataComment();
                    setEditCommentId(null);
                    setEditCommentContent("");
                }
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleBtnDeleteComment = (
        commentId: number | undefined,
        content: string
    ) => {
        console.log("commentId", commentId);
        console.log("content", content);
        showDeleteConfirm({
            title: `Bạn có chắc chắn muốn xóa comment này không?`,
            content: `Nội dung: ${content}`,
            onOk: async () => {
                try {
                    if (commentId !== undefined) {
                        const res = await commentApi.deleteComment(commentId);
                        if (res && res.statusCode === 200) {
                            toast.success("Xóa bình luận thành công.");
                            fetchDataComment();
                        }
                    }
                } catch (error: any) {
                    toast.error(error.response.data.content);
                }
            },
        });
    };

    return (
        <div>
            <div className="mt-2 flex items-center gap-4">
                <img
                    src={userLogin.avatar}
                    alt="avatar"
                    className="w-[40px] rounded-full"
                />
                <Input
                    placeholder="Viết câu trả lời"
                    style={{ width: "60%" }}
                    value={contentComment}
                    onChange={handleInputChange}
                />
                <Button type="primary" onClick={handleBtnSubmitComment}>
                    Submit
                </Button>
            </div>
            <div className="max-h-[300px] overflow-y-scroll">
                {listComment.map((comment: CommentType) => (
                    <div
                        key={comment.id}
                        className="mt-4 flex items-center gap-4"
                    >
                        <img
                            src={comment.user.avatar}
                            alt="avatar"
                            className="w-[40px] rounded-full"
                        />
                        <div>
                            <div className="font-bold text-[18px]">
                                {comment.user.name}
                            </div>
                            {editCommentId === comment.id ? (
                                <div className="flex gap-10">
                                    <Input
                                        value={editCommentContent}
                                        onChange={handleEditInputChange}
                                        style={{ width: "70%" }}
                                    />
                                    <div className="flex gap-2 w-[30%]">
                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                handleBtnSaveEditComment()
                                            }
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setEditCommentId(null);
                                                setEditCommentContent("");
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div>{comment.contentComment}</div>
                            )}

                            {comment.userId === userLogin.id && (
                                <div className="flex gap-3 ">
                                    <div
                                        className="cursor-pointer text-[#929398] text-[14px] hover:opacity-70 transition-all duration-300"
                                        onClick={() =>
                                            handleBtnEditComment(
                                                comment.id,
                                                comment.contentComment
                                            )
                                        }
                                    >
                                        Chỉnh sửa <EditOutlined />
                                    </div>
                                    {comment.id !== undefined && (
                                        <div
                                            className="cursor-pointer text-[#929398] text-[14px] hover:opacity-70 transition-all duration-300"
                                            onClick={() =>
                                                handleBtnDeleteComment(
                                                    comment.id,
                                                    comment.contentComment
                                                )
                                            }
                                        >
                                            Xóa <DeleteOutlined />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
