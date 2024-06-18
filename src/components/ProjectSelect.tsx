import React from "react";
import { Select } from "antd";

interface ProjectOption {
    value: number;
    label: string;
}

interface ProjectSelectProps {
    projectOptions: ProjectOption[];
    onSelectProject: (projectId: number) => void;
    value?: number | undefined;
    onChange?: (value: number | undefined) => void;
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({
    projectOptions,
    onSelectProject,
    value,
    onChange,
}) => {
    const filterOption = (input: string, option?: { label?: string }) => {
        if (option?.label) {
            return option.label.toLowerCase().includes(input.toLowerCase());
        }
        return false;
    };

    return (
        <div>
            <label className="text-[18px] font-bold">Project</label>
            <div className="mt-2">
                <Select
                    showSearch
                    placeholder="Select a project"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    style={{ width: "100%" }}
                    options={projectOptions}
                    onChange={(value) => {
                        if (value !== undefined) {
                            onSelectProject(value);
                            onChange && onChange(value);
                        }
                    }}
                    value={value}
                >
                    {projectOptions.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <p className="text-orange-500">
                *{" "}
                <span className="italic">
                    You can only create tasks of your own projects!
                </span>
            </p>
        </div>
    );
};
