import React, { useEffect, useState } from "react";
import { Button, Modal, Progress, Input, Select } from "antd";
import {
    LstTaskDeTail,
    MemberTask,
    PriorityType,
    StatusType,
    TaskType,
    TaskTypeDetail,
} from "types";
import { DescriptionEditor } from "./DescriptionEditor";
import { PrioritySelect } from "./PrioritySelect";
import { TaskTypeSelect } from "./TaskTypeSelect";
import { AssignersSelect } from "./AssignersSelect";
import { optionApi, projectApi } from "api";
import { useFetch } from "hooks";
import { CommentComponent } from "./CommentComponent";
import { DeleteOutlined } from "@ant-design/icons";
import { showDeleteConfirm } from "./DeleteTask";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface ModalTaskDetailProps {
    open: boolean;
    onCancel: () => void;
    taskId: number;
    members: MemberTask[];
    onTaskDeleted: () => void;
}

export const ModalTaskDetail: React.FC<ModalTaskDetailProps> = ({
    open,
    onCancel,
    members,
    taskId,
    onTaskDeleted,
}) => {
    const [taskInfo, setTaskInfo] = useState<LstTaskDeTail>();
    const { idProject } = useParams<{ idProject: string }>();

    const fetchDataTask = async () => {
        try {
            const res = await projectApi.getTaskDetail(taskId);
            if (res && res.statusCode === 200) {
                setTaskInfo(res.content);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDataTask();
    }, [taskId]);

    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<number | undefined>(undefined);
    const [taskType, setTaskType] = useState<string>("");
    const [statusId, setStatusId] = useState<string>("");
    const [assignees, setAssignees] = useState<number[]>([]);

    useEffect(() => {
        if (taskInfo) {
            setDescription(taskInfo.description ?? "");
            setPriority(taskInfo.priorityTask.priorityId);
            setTaskType(String(taskInfo.taskTypeDetail.taskType) ?? "");
            setStatusId(taskInfo.statusId ?? "");
            setAssignees(
                taskInfo.assigness.map((assignee) => assignee.id) ?? []
            );
        }
    }, [taskInfo]);

    const calculatePercent = (spent: number, remaining: number) => {
        if (spent + remaining === 0) {
            return 0;
        }
        return (spent / (spent + remaining)) * 100;
    };

    const { data: statusData } = useFetch<StatusType[]>(optionApi.getAllStatus);
    const { data: priorityData } = useFetch<PriorityType[]>(
        optionApi.getAllPriority
    );
    const { data: taskTypeData } = useFetch<TaskType[]>(
        optionApi.getAllTaskType
    );

    const percent = taskInfo
        ? calculatePercent(
              taskInfo.timeTrackingSpent,
              taskInfo.timeTrackingRemaining
          )
        : 0;

    const priorityOptions =
        (priorityData &&
            priorityData.length > 0 &&
            priorityData.map((item: PriorityType) => ({
                value: String(item.priorityId),
                label: item.priority,
            }))) ||
        [];

    const taskTypeOptions =
        (taskTypeData &&
            taskTypeData.length > 0 &&
            taskTypeData.map((item: TaskTypeDetail) => ({
                value: String(item.id),
                label: item.taskType,
            }))) ||
        [];

    const memberOptions = members.map((member) => ({
        value: member.userId,
        label: member.name,
    }));

    const statusDataOptions =
        statusData?.map((item) => ({
            value: String(item.statusId),
            label: item.statusName,
        })) || [];

    const handleStatusChange = (value: string) => {
        setStatusId(value);
    };

    const handleBtnDeleteTask = () => {
        showDeleteConfirm({
            title: "Bạn có chắc chắn muốn xóa task?",
            content: `Thông tin: ${taskInfo?.taskName}`,
            onOk: async () => {
                try {
                    const res = await projectApi.removeTask(taskId);
                    if (res && res.statusCode === 200) {
                        toast.success("Xóa task thành công!");
                        onTaskDeleted();
                        onCancel();
                    }
                } catch (error: any) {
                    toast.error(error.response.data.content);
                }
            },
        });
    };

    return (
        <Modal
            title={
                <div className="flex justify-center">
                    <div className="font-bold text-[25px] text-center mb-[10px]">
                        TASK - {taskId}
                    </div>
                    <div className="ml-auto">
                        <Button
                            type="text"
                            className="!text-red-500 !hover:text-red-700 !text-[14px] !font-bold"
                            icon={<DeleteOutlined />}
                            onClick={handleBtnDeleteTask}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            }
            centered
            width={1000}
            open={open}
            onCancel={onCancel}
            closeIcon={null}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
            ]}
        >
            {taskInfo && (
                <div className="flex gap-[30px]">
                    <div className="w-full">
                        <div className="flex">
                            <Input defaultValue={taskInfo.taskName} />
                            <Button type="primary" className="ml-[20px]">
                                Submit
                            </Button>
                        </div>
                        <div>
                            <DescriptionEditor
                                description={description}
                                onDescriptionChange={setDescription}
                            />
                            <div className="flex justify-end">
                                <Button type="primary">Save</Button>
                            </div>
                        </div>
                        <div>
                            <label className="text-[18px] font-bold">
                                Comment
                            </label>
                            <CommentComponent taskId={taskId} />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-col">
                            <label className="text-[18px] font-bold">
                                Status
                            </label>
                            <div className="mt-2 ">
                                <Select
                                    className="w-full"
                                    options={statusDataOptions}
                                    value={statusId}
                                    onChange={handleStatusChange}
                                />
                            </div>
                        </div>
                        <PrioritySelect
                            priorityOptions={priorityOptions}
                            defaultPriority={priority}
                            onSelectPriority={setPriority}
                            value={priority}
                            onChange={setPriority}
                            onBlur={() => {}}
                            name="priority"
                        />
                        <TaskTypeSelect
                            taskTypeOptions={taskTypeOptions}
                            defaultTaskType={taskType}
                            onSelectTaskType={setTaskType}
                            value={taskType}
                            onChange={setTaskType}
                            onBlur={() => {}}
                            name="taskType"
                        />
                        <AssignersSelect
                            memberOptions={memberOptions}
                            value={assignees}
                            onChange={setAssignees}
                        />
                        <div className="my-4 flex gap-[10px]">
                            <span className="font-semibold w-1/2">
                                Original Estimate (hours):{" "}
                            </span>
                            <Input defaultValue={taskInfo.originalEstimate} />
                        </div>
                        <div className="mb-4 flex gap-[10px]">
                            <span className="font-semibold w-1/2">
                                Time Spent (hours):{" "}
                            </span>
                            <Input defaultValue={taskInfo.timeTrackingSpent} />
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">
                                Time Remaining:{" "}
                            </span>
                            <span>{taskInfo.timeTrackingRemaining} hours</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">
                                Time Tracking:{" "}
                            </span>
                            <Progress
                                percent={percent}
                                format={(percent) =>
                                    `${(percent ?? 0).toFixed(2)}%`
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};
