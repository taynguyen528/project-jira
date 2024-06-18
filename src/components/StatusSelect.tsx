import React from "react";
import { Select } from "antd";

interface StatusOption {
    value: number;
    label: string;
}

interface StatusSelectProps {
    statusOptions: StatusOption[];
    defaultStatus?: number;
    onChange?: (value: number) => void;
    onSelectStatus?: (value: number) => void;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
    statusOptions,
    defaultStatus,
    onChange,
    onSelectStatus,
}) => {
    return (
        <div className="mt-3">
            <label className="text-[18px] font-bold">Status</label>
            <div className="mt-2">
                <Select
                    style={{ width: "100%" }}
                    options={statusOptions}
                    defaultValue={defaultStatus}
                    onChange={onChange}
                    onSelect={onSelectStatus}
                />
            </div>
        </div>
    );
};
