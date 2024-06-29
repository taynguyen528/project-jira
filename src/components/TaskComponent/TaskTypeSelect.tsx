import React from "react";
import { Select } from "antd";

interface TaskTypeSelectProps {
    taskTypeOptions: { value: string | number; label: string }[];
    defaultTaskType?: string;
    onSelectTaskType: (taskType: string) => void;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    name: string;
}

export const TaskTypeSelect: React.FC<TaskTypeSelectProps> = ({
    taskTypeOptions,
    defaultTaskType,
    onSelectTaskType,
    ...rest
}) => (
    <div className="mt-3">
        <label className="text-[18px] font-bold">Task Type</label>
        <div className="mt-2">
            <Select
                {...rest}
                style={{ width: "100%" }}
                options={taskTypeOptions}
                defaultValue={defaultTaskType}
                onChange={(value) => onSelectTaskType(value)}
            />
        </div>
    </div>
);
