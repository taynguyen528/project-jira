import React from "react";
import { Select } from "antd";

interface AssignersSelectProps {
    memberOptions: { value: number; label: string }[];
    onSelectAssigners: (assigners: number[]) => void;
}

export const AssignersSelect: React.FC<AssignersSelectProps> = ({
    memberOptions,
    onSelectAssigners,
}) => (
    <div className="mt-3">
        <label className="text-[18px] font-bold">Assigners</label>
        <div className="mt-2">
            <Select
                style={{ width: "100%" }}
                mode="multiple"
                options={memberOptions}
                onChange={(values) => onSelectAssigners(values as number[])}
            />
        </div>
    </div>
);
