import React from "react";
import { Input } from "antd";

interface TaskNameInputProps {
    onChange: (value: string) => void;
    value: string;
    placeholder?: string;
}

export const TaskNameInput: React.FC<TaskNameInputProps> = ({
    onChange,
    value,
    placeholder = "Task name",
    ...rest
}) => (
    <div>
        <label className="text-[18px] font-bold">Task name</label>
        <div className="mt-2">
            <Input
                {...rest}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    </div>
);
