import React from "react";
import { Select } from "antd";

interface AssignersSelectProps {
    memberOptions: { value: number; label: string }[];
    value?: number[];
    onChange?: (values: number[]) => void;
}

export const AssignersSelect: React.FC<AssignersSelectProps> = ({
    memberOptions,
    value = [],
    onChange,
}) => {
    const handleChange = (values: number[]) => {
        if (values.length > 0) {
            if (onChange) {
                onChange(values);
            }
        }
    };

    return (
        <div className="mt-3">
            <label className="text-[18px] font-bold">Assigners</label>
            <div className="mt-2">
                <Select
                    style={{ width: "100%" }}
                    mode="multiple"
                    options={memberOptions}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};
