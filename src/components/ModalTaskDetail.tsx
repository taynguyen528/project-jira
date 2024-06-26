import React, { useState } from "react";
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
import { optionApi } from "api";
import { useFetch } from "hooks";
import { CommentComponent } from "./CommentComponent";
import { DeleteOutlined } from "@ant-design/icons";

interface ModalTaskDetailProps {
    open: boolean;
    onCancel: () => void;
    task: LstTaskDeTail;
    members: MemberTask[];
}

export const ModalTaskDetail: React.FC<ModalTaskDetailProps> = ({
    open,
    onCancel,
    task,
    members,
}) => {
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priorityTask.priorityId);
    const [taskType, setTaskType] = useState(
        String(task.taskTypeDetail.taskType)
    );
    const [statusId, setStatusId] = useState(task.statusId);
    const [assignees, setAssignees] = useState(
        task.assigness.map((assignee) => assignee.id)
    );

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
    const percent = calculatePercent(
        task.timeTrackingSpent,
        task.timeTrackingRemaining
    );

    const priorityOptions =
        priorityData &&
        priorityData.length > 0 &&
        priorityData.map((item: PriorityType) => ({
            value: item.priorityId,
            label: item.priority,
        }));

    const taskTypeOptions =
        taskTypeData &&
        taskTypeData.length > 0 &&
        taskTypeData.map((item: TaskTypeDetail) => ({
            value: item.id,
            label: item.taskType,
        }));

    const memberOptions = members.map((member) => ({
        value: member.userId,
        label: member.name,
    }));

    const statusDataOptions =
        statusData &&
        statusData.length > 0 &&
        statusData.map((item) => ({
            value: item.statusId,
            label: item.statusName,
        }));

    const handleStatusChange = (value: string) => {
        setStatusId(value);
    };

    return (
        <Modal
            title={
                <div className="flex justify-center">
                    <div className="font-bold text-[25px] text-center mb-[10px]">
                        TASK - {task.taskId}
                    </div>
                    <div className="ml-auto mr-10">
                        <Button
                            type="text"
                            className="text-gray-500 hover:text-gray-700"
                            icon={<DeleteOutlined />}
                        />
                    </div>
                </div>
            }
            centered
            width={1000}
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
            ]}
        >
            <div className="flex gap-[30px]">
                <div className="w-[60%]">
                    <div className="flex">
                        <Input defaultValue={task.taskName} />
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
                        <label className="text-[18px] font-bold">Comment</label>
                        <CommentComponent />
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-col">
                        <label className="text-[18px] font-bold"> Status</label>
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
                        <Input defaultValue={task.originalEstimate} />
                    </div>
                    <div className="mb-4 flex gap-[10px]">
                        <span className="font-semibold w-1/2">
                            Time Spent (hours):{" "}
                        </span>
                        <Input defaultValue={task.timeTrackingSpent} />
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Time Remaining: </span>
                        <span>{task.timeTrackingRemaining} hours</span>
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Time Tracking: </span>
                        <Progress
                            percent={percent}
                            format={(percent) =>
                                `${(percent ?? 0).toFixed(2)}%`
                            }
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
