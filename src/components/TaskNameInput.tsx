import React from "react";
import { Input } from "antd";

interface TaskNameInputProps {
    onChange: (value: string) => void;
}

export const TaskNameInput: React.FC<TaskNameInputProps> = ({ onChange }) => (
    <div>
        <label className="text-[18px] font-bold">Task name</label>
        <div className="mt-2">
            <Input
                placeholder="Task name"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    </div>
);
