import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { optionApi, projectApi, taskApi } from "api";
import { showDeleteConfirm } from "./ConfirmDelete";
import {
    LstTaskDeTail,
    MemberTask,
    PriorityType,
    StatusType,
    TaskType,
    TaskTypeDetail,
    TaskTypeModel,
} from "types";
import { useFetch } from "hooks";
import { TaskDetailsForm } from "./TaskDetailsForm";
import { TaskInfoForm } from "./TaskInfoForm";

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
    const fetchDataTask = async () => {
        try {
            const res = await taskApi.getTaskDetail(taskId);
            if (res && res.statusCode === 200) {
                setProjectId(res.content.projectId);
                setTaskInfo(res.content);
                setTaskName(res.content.taskName);
                setDescription(res.content.description ?? "");
                setPriority(res.content.priorityTask.priorityId);
                setTaskType(String(res.content.taskTypeDetail.taskType) ?? "");
                setTypeId(res.content.taskTypeDetail.id ?? 1);
                setStatusId(res.content.statusId ?? "");
                setAssignees(
                    res.content.assigness.map((assignee) => assignee.id) ?? []
                );
                setOriginalEstimate(res.content.originalEstimate ?? 0);
                setTimeTrackingSpent(res.content.timeTrackingSpent ?? 0);
                setTimeTrackingRemaining(
                    res.content.timeTrackingRemaining ?? 0
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (open && taskId) {
            fetchDataTask();
        }
    }, [open, taskId]);

    const [projectId, setProjectId] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<number | string>(0);
    const [taskType, setTaskType] = useState<string>("");
    const [typeId, setTypeId] = useState<number>(1);
    const [statusId, setStatusId] = useState<string>("");
    const [assignees, setAssignees] = useState<number[]>([]);
    const [taskName, setTaskName] = useState<string>("");
    const [isTaskNameChanged, setIsTaskNameChanged] = useState<boolean>(false);
    const [isDescriptionChanged, setIsDescriptionChanged] =
        useState<boolean>(false);
    const [originalEstimate, setOriginalEstimate] = useState<number>(0);
    const [timeTrackingSpent, setTimeTrackingSpent] = useState<number>(0);
    const [timeTrackingRemaining, setTimeTrackingRemaining] =
        useState<number>(0);
    const [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        if (taskInfo) {
            setDescription(taskInfo.description ?? "");
            setPriority(taskInfo.priorityTask.priorityId);
            setTaskType(String(taskInfo.taskTypeDetail.taskType) ?? "");
            setStatusId(taskInfo.statusId ?? "");
            setAssignees(
                taskInfo.assigness.map((assignee) => assignee.id) ?? []
            );
            setTypeId(taskInfo.taskTypeDetail.id);
            setOriginalEstimate(taskInfo.originalEstimate ?? 0);
            setTimeTrackingSpent(taskInfo.timeTrackingSpent ?? 0);
            setTimeTrackingRemaining(taskInfo.timeTrackingRemaining ?? 0);
        }
    }, [taskInfo]);

    const calculatePercent = (spent: number, remaining: number) => {
        if (spent + remaining === 0) {
            return 0;
        }
        return (spent / (spent + remaining)) * 100;
    };

    useEffect(() => {
        setPercent(calculatePercent(timeTrackingSpent, timeTrackingRemaining));
    }, [timeTrackingSpent, timeTrackingRemaining]);

    const { data: statusData } = useFetch<StatusType[]>(optionApi.getAllStatus);
    const { data: priorityData } = useFetch<PriorityType[]>(
        optionApi.getAllPriority
    );
    const { data: taskTypeData } = useFetch<TaskType[]>(
        optionApi.getAllTaskType
    );

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
                taskId: taskId,
                statusId: value,
            });
            if (res && res.statusCode === 200) {
                toast.success("Cập nhật trạng thái thành công!");
                onFetchTask();
            }
        } catch (error) {
            toast.error("Cập nhật trạng thái thất bại!");
            console.log(error);
        }
    };

    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
        setIsTaskNameChanged(true);
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setIsDescriptionChanged(true);
    };

    const handleTaskTypeChange = (value: string) => {
        setTaskType(value);
        const selectedTaskType = taskTypeData?.find(
            (type) => String(type.id) === value
        );
        if (selectedTaskType) {
            setTypeId(selectedTaskType.id);
        }
    };

    const hasPriorityChanged = priority !== taskInfo?.priorityTask.priorityId;
    const hasTaskTypeChanged = taskType !== taskInfo?.taskTypeDetail.taskType;
    const hasAssigneesChanged =
        JSON.stringify(assignees) !==
        JSON.stringify(taskInfo?.assigness.map((a) => a.id));

    const handleUpdateTask = async () => {
        if (!taskInfo) return;
        const updateData: TaskTypeModel = {
            projectId,
            listUserAsign: assignees,
            taskId: taskId,
            taskName: taskName || "",
            description: description || "",
            statusId: statusId,
            originalEstimate: originalEstimate,
            timeTrackingSpent: timeTrackingSpent,
            timeTrackingRemaining: timeTrackingRemaining,
            typeId: typeId,
            priorityId: Number(priority),
        };

        try {
            const res = await taskApi.updateTask(updateData);
            if (res && res.statusCode === 200) {
                toast.success("Cập nhật thông tin task thành công!");
                setIsTaskNameChanged(false);
                setIsDescriptionChanged(false);
                onFetchTask();
            } else {
                toast.error("Cập nhật thông tin task thất bại!");
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    useEffect(() => {
        if (hasPriorityChanged || hasTaskTypeChanged || hasAssigneesChanged) {
            handleUpdateTask();
        }
    }, [priority, taskType, assignees]);

    const handleOriginalEstimateChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = parseFloat(e.target.value);
        setOriginalEstimate(value);
        try {
            const res = await projectApi.updateEstimate({
                taskId,
                originalEstimate: value,
            });
            if (res && res.statusCode === 200) {
                toast.success(res.message);
                onFetchTask();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleTimeTrackingSpentChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = parseFloat(e.target.value);
        setTimeTrackingSpent(value);
        try {
            const res = await projectApi.updateTimeTracking({
                taskId,
                timeTrackingSpent: value,
                timeTrackingRemaining,
            });
            if (res && res.statusCode === 200) {
                toast.success(res.message);
                onFetchTask();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleTimeTrackingRemainingChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = parseFloat(e.target.value);
        setTimeTrackingRemaining(value);
        try {
            const res = await projectApi.updateTimeTracking({
                taskId,
                timeTrackingSpent,
                timeTrackingRemaining: value,
            });
            if (res && res.statusCode === 200) {
                toast.success(res.message);
                onFetchTask();
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
                    Huỷ bỏ
                </Button>,
            ]}
        >
            {taskInfo && (
                <div className="flex gap-[30px]">
                    <TaskInfoForm
                        taskId={taskId}
                        taskName={taskName}
                        description={description}
                        isTaskNameChanged={isTaskNameChanged}
                        isDescriptionChanged={isDescriptionChanged}
                        handleTaskNameChange={handleTaskNameChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handleUpdateTask={handleUpdateTask}
                    />
                    <TaskDetailsForm
                        statusId={statusId}
                        handleStatusChange={handleStatusChange}
                        priorityOptions={priorityOptions}
                        priority={priority}
                        setPriority={setPriority}
                        taskTypeOptions={taskTypeOptions}
                        statusDataOptions={statusDataOptions}
                        taskType={taskType}
                        handleTaskTypeChange={handleTaskTypeChange}
                        memberOptions={memberOptions}
                        assignees={assignees}
                        setAssignees={setAssignees}
                        originalEstimate={originalEstimate}
                        handleOriginalEstimateChange={
                            handleOriginalEstimateChange
                        }
                        timeTrackingSpent={timeTrackingSpent}
                        handleTimeTrackingSpentChange={
                            handleTimeTrackingSpentChange
                        }
                        timeTrackingRemaining={timeTrackingRemaining}
                        handleTimeTrackingRemainingChange={
                            handleTimeTrackingRemainingChange
                        }
                        percent={percent}
                    />
                </div>
            )}
        </Modal>
    );
};
