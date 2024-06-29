import React from "react";
import { Select } from "antd";

interface PrioritySelectProps {
    priorityOptions: { value: number | string; label: string }[];
    defaultPriority?: number | string | undefined;
    onSelectPriority: (priority: number | string) => void;
    value: number | undefined | string;
    onChange: (value: number | string) => void;
    onBlur: () => void;
    name: string;
}

export const PrioritySelect: React.FC<PrioritySelectProps> = ({
    priorityOptions,
    defaultPriority,
    onSelectPriority,
    ...rest
}) => (
    <div className="mt-3">
        <label className="text-[18px] font-bold">Priority</label>
        <div className="mt-2">
            <Select
                {...rest}
                style={{ width: "100%" }}
                options={priorityOptions}
                defaultValue={defaultPriority}
                onChange={(value) => onSelectPriority(value)}
            />
        </div>
    </div>
);
