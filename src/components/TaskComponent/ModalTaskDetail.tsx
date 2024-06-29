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
import { optionApi, taskApi } from "api";
import { useFetch } from "hooks";
import { CommentComponent } from "./CommentComponent";
import { DeleteOutlined } from "@ant-design/icons";
import { showDeleteConfirm } from "./ConfirmDelete";
import { toast } from "react-toastify";

interface ModalTaskDetailProps {
    open: boolean;
    onCancel: () => void;
    taskId: number;
    members: MemberTask[];
    onFetchTask: () => void;
}

export const ModalTaskDetail: React.FC<ModalTaskDetailProps> = ({
    open,
    onCancel,
    members,
    taskId,
    onFetchTask,
}) => {
    const [taskInfo, setTaskInfo] = useState<LstTaskDeTail>();

    useEffect(() => {
        const fetchDataTask = async () => {
            try {
                const res = await taskApi.getTaskDetail(taskId);
                if (res && res.statusCode === 200) {
                    setTaskInfo(res.content);
                    setTaskName(res.content.taskName);
                    setDescription(res.content.description ?? "");
                    setPriority(res.content.priorityTask.priority);
                    setTaskType(
                        String(res.content.taskTypeDetail.taskType) ?? ""
                    );
                    setStatusId(res.content.statusId ?? "");
                    setAssignees(
                        res.content.assigness.map((assignee) => assignee.id) ??
                            []
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (open && taskId) {
            fetchDataTask();
        }
    }, [open, taskId]);

    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<number | string | undefined>(
        undefined
    );
    const [taskType, setTaskType] = useState<string>("");
    const [statusId, setStatusId] = useState<string>("");
    const [assignees, setAssignees] = useState<number[]>([]);
    const [taskName, setTaskName] = useState<string>("");
    const [isTaskNameChanged, setIsTaskNameChanged] = useState<boolean>(false);
    const [isDescriptionChanged, setIsDescriptionChanged] =
        useState<boolean>(false);

    useEffect(() => {
        if (taskInfo) {
            setDescription(taskInfo.description ?? "");
            setPriority(taskInfo.priorityTask.priority);
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
                value: item.priorityId,
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

    const handleStatusChange = async (value: string) => {
        setStatusId(value);
        try {
            const res = await taskApi.updateStatus({
                taskId,
                statusId: value,
            });
            if (res && res.statusCode === 200) {
                toast.success("Cập nhật trạng thái thành công!");
                onFetchTask();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
        setIsTaskNameChanged(e.target.value !== taskInfo?.taskName);
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setIsDescriptionChanged(value !== taskInfo?.description);
    };

    const hasPriorityChanged = priority !== taskInfo?.priorityTask.priority;
    const hasTaskTypeChanged = taskType !== taskInfo?.taskTypeDetail.taskType;

    const handleUpdateTask = async (updatedFields: Partial<LstTaskDeTail>) => {
        if (!taskInfo) return;

        const updatedTask = {
            ...taskInfo,
            ...updatedFields,
            listUserAsign: assignees,
            taskName: taskName,
            description: description,
            statusId: statusId,
        };

        try {
            const res = await taskApi.updateTask(updatedTask);
            if (res && res.statusCode === 200) {
                toast.success("Cập nhật task thành công!");
                onFetchTask();
                setIsTaskNameChanged(false);
                setIsDescriptionChanged(false);

                if (hasPriorityChanged || hasTaskTypeChanged) {
                    const updatedData = {
                        listUserAsign: updatedTask.listUserAsign,
                        taskId: updatedTask.taskId,
                        taskName: updatedTask.taskName,
                        description: updatedTask.description,
                        statusId: updatedTask.statusId,
                        originalEstimate: updatedTask.originalEstimate ?? 0,
                        timeTrackingSpent: updatedTask.timeTrackingSpent ?? 0,
                        timeTrackingRemaining:
                            updatedTask.timeTrackingRemaining ?? 0,
                        projectId: updatedTask.projectId ?? 0,
                        typeId: hasTaskTypeChanged
                            ? parseInt(taskType, 10)
                            : updatedTask.taskTypeDetail.id,
                        priorityId: hasPriorityChanged
                            ? parseInt(priority as string, 10)
                            : updatedTask.priorityTask.priorityId,
                    };

                    const updateRes = await taskApi.updateTask(updatedData);
                    if (updateRes && updateRes.statusCode === 200) {
                        onFetchTask();
                    } else {
                        toast.error(
                            "Có lỗi xảy ra khi cập nhật Priority hoặc Task Type."
                        );
                    }
                }
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleBtnDeleteTask = () => {
        showDeleteConfirm({
            title: "Bạn có chắc chắn muốn xóa task?",
            content: `Thông tin: ${taskInfo?.taskName}`,
            onOk: async () => {
                try {
                    const res = await taskApi.removeTask(taskId);
                    if (res && res.statusCode === 200) {
                        toast.success("Xóa task thành công!");
                        onFetchTask();
                        onCancel();
                    }
                } catch (error: any) {
                    toast.error(error.response.data.content);
                }
            },
        });
    };
    
    useEffect(() => {
        if (
            priority !== taskInfo?.priorityTask.priority ||
            taskType !== taskInfo?.taskTypeDetail.taskType
        ) {
            handleUpdateTask({ priority, taskType });
        }
    }, [priority, taskType]);

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
                            <Input
                                value={taskName}
                                onChange={handleTaskNameChange}
                            />
                            <Button
                                type="primary"
                                className="ml-[20px]"
                                disabled={!isTaskNameChanged}
                                onClick={() => handleUpdateTask({ taskName })}
                            >
                                Submit
                            </Button>
                        </div>
                        <div>
                            <DescriptionEditor
                                description={description}
                                onDescriptionChange={handleDescriptionChange}
                            />
                            <div className="flex justify-end">
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        handleUpdateTask({ description })
                                    }
                                    disabled={!isDescriptionChanged}
                                >
                                    Save
                                </Button>
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
                            <Input value={taskInfo.originalEstimate} />
                        </div>
                        <div className="mb-4 flex gap-[10px]">
                            <span className="font-semibold w-1/2">
                                Time Spent (hours):{" "}
                            </span>
                            <Input value={taskInfo.timeTrackingSpent} />
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
