import { Input, Progress, Select } from "antd";
import { PrioritySelect } from "./PrioritySelect";
import { TaskTypeSelect } from "./TaskTypeSelect";
import { AssignersSelect } from "./AssignersSelect";

interface TaskDetailsFormProps {
    statusId: string;
    handleStatusChange: (value: string) => void;
    priorityOptions: { value: string | number; label: string }[];
    priority: string | number | undefined;
    setPriority: (value: string | number) => void;
    taskTypeOptions: { value: string; label: string }[];
    taskType: string;
    handleTaskTypeChange: (value: string) => void;
    memberOptions: { value: number; label: string }[];
    assignees: number[];
    setAssignees: (value: number[]) => void;
    originalEstimate: number;
    statusDataOptions: { value: string; label: string }[];
    handleOriginalEstimateChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    timeTrackingSpent: number;
    handleTimeTrackingSpentChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    timeTrackingRemaining: number;
    handleTimeTrackingRemainingChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    percent: number;
}

export const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({
    statusId,
    handleStatusChange,
    priorityOptions,
    priority,
    setPriority,
    taskTypeOptions,
    taskType,
    handleTaskTypeChange,
    memberOptions,
    assignees,
    setAssignees,
    originalEstimate,
    statusDataOptions,
    handleOriginalEstimateChange,
    timeTrackingSpent,
    handleTimeTrackingSpentChange,
    timeTrackingRemaining,
    handleTimeTrackingRemainingChange,
    percent,
}) => (
    <div className="w-1/2">
        <div className="flex flex-col">
            <label className="text-[18px] font-bold">Status</label>
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
            onSelectTaskType={handleTaskTypeChange}
            value={taskType}
            onChange={handleTaskTypeChange}
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
            <Input
                value={originalEstimate}
                onChange={handleOriginalEstimateChange}
                type="number"
            />
        </div>
        <div className="mb-4 flex gap-[10px]">
            <span className="font-semibold w-1/2">Time Spent (hours): </span>
            <Input
                value={timeTrackingSpent}
                onChange={handleTimeTrackingSpentChange}
                type="number"
            />
        </div>
        <div className="mb-4 flex gap-[10px]">
            <span className="font-semibold">Time Remaining (hours): </span>
            <Input
                value={timeTrackingRemaining}
                onChange={handleTimeTrackingRemainingChange}
                type="number"
            />
        </div>
        <div className="mb-4">
            <span className="font-semibold">Time Tracking: </span>
            <Progress
                percent={percent}
                format={(percent) => `${(percent ?? 0).toFixed(2)}%`}
            />
        </div>
    </div>
);
