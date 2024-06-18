import React from "react";
import { Select } from "antd";

interface PriorityAndTaskTypeSelectProps {
    priorityOptions: { value: number; label: string }[];
    taskTypeOptions: { value: number; label: string }[];
    defaultPriority?: number; // Cập nhật kiểu thành number
    defaultTaskType?: number; // Cập nhật kiểu thành number
    onSelectPriority: (priority: number) => void;
    onSelectTaskType: (taskType: number) => void;
}

export const PriorityAndTaskTypeSelect: React.FC<PriorityAndTaskTypeSelectProps> = ({
    priorityOptions,
    taskTypeOptions,
    defaultPriority,
    defaultTaskType,
    onSelectPriority,
    onSelectTaskType,
}) => (
    <div className="mt-3 flex gap-4">
        <div className="w-1/2">
            <label className="text-[18px] font-bold">Priority</label>
            <div className="mt-2">
                <Select
                    style={{ width: "100%" }}
                    options={priorityOptions}
                    defaultValue={defaultPriority}
                    onChange={(value) => onSelectPriority(value)}
                />
            </div>
        </div>
        <div className="w-1/2">
            <label className="text-[18px] font-bold">Task Type</label>
            <div className="mt-2">
                <Select
                    style={{ width: "100%" }}
                    options={taskTypeOptions}
                    defaultValue={defaultTaskType}
                    onChange={(value) => onSelectTaskType(value)}
                />
            </div>
        </div>
    </div>
);
