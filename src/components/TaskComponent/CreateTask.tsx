import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Drawer, Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    ContentProject,
    MemberTask,
    PriorityType,
    StatusType,
    TaskType,
    CreateTaskType,
} from "types";
import { optionApi, projectApi, taskApi } from "api";
import {
    AssignersSelect,
    DescriptionEditor,
    PrioritySelect,
    ProjectSelect,
    TaskNameInput,
    TaskTypeSelect,
    TimeTrackingInputs, 
} from "components";
import { createTaskSchema } from "schemas";
import { toast } from "react-toastify";

interface CreateTaskProps {
    onClose: () => void;
    open: boolean;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ onClose, open }) => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm<CreateTaskType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: "1",
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: undefined,
            typeId: 1,
            priorityId: 1,
        },
    });

    const [dataProject, setDataProject] = useState<ContentProject[]>([]);
    const [statusData, setStatusData] = useState<StatusType[]>([]);
    const [priorityData, setPriorityData] = useState<PriorityType[]>([]);
    const [taskTypeData, setTaskTypeData] = useState<TaskType[]>([]);
    const [assigners, setAssigners] = useState<MemberTask[]>([]);
    const [projectId, setProjectId] = useState<number | undefined>(undefined);

    const fetchDataProject = async () => {
        try {
            const res = await projectApi.getAllProject();
            setDataProject(res.content);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStatus = async () => {
        try {
            const res = await optionApi.getAllStatus();
            setStatusData(res.content);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPriority = async () => {
        try {
            const res = await optionApi.getAllPriority();
            setPriorityData(res.content);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTaskType = async () => {
        try {
            const res = await optionApi.getAllTaskType();
            setTaskTypeData(res.content);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataProjectDetail = async (idProject: number) => {
        try {
            const res = await projectApi.getProjectDetail(idProject);
            setAssigners(res.content.members);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataProject();
        fetchStatus();
        fetchPriority();
        fetchTaskType();
        if (projectId) {
            fetchDataProjectDetail(projectId);
        }
    }, [projectId]);

    const onSubmit = async (data: CreateTaskType) => {
        try {
            const res = await taskApi.createTask(data);
            if (res && res.statusCode === 200) {
                toast.success("Tạo task thành công.");
                onClose();
                reset();
                setValue("originalEstimate", 0);
                setValue("timeTrackingSpent", 0);
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const totalEstimatedHours = watch("originalEstimate");
    const hoursSpent = watch("timeTrackingSpent");

    useEffect(() => {
        const remaining = totalEstimatedHours - hoursSpent;
        setValue("timeTrackingRemaining", remaining >= 0 ? remaining : 0);
    }, [totalEstimatedHours, hoursSpent, setValue]);

    return (
        <Drawer
            onClose={onClose}
            open={open}
            width={700}
            closeIcon={null}
            title={
                <div className="flex justify-between items-center w-full">
                    <div className="text-[20px] font-semibold">Create Task</div>
                    <Button
                        type="text"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        icon={<CloseOutlined />}
                    />
                </div>
            }
        >
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="projectId"
                        control={control}
                        render={({ field }) => (
                            <ProjectSelect
                                value={field.value ?? undefined}
                                onChange={(value) => {
                                    if (value !== undefined) {
                                        field.onChange(value);
                                        setProjectId(value);
                                    }
                                }}
                                projectOptions={dataProject.map((item) => ({
                                    value: item.id,
                                    label: item.alias,
                                }))}
                                onSelectProject={(projectId) => {
                                    if (projectId !== undefined) {
                                        field.onChange(projectId);
                                        setProjectId(projectId);
                                    }
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="taskName"
                        control={control}
                        render={({ field }) => (
                            <TaskNameInput
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                            />
                        )}
                    />
                    {errors?.taskName && (
                        <p className="text-red-500 text-xs mt-1 text-[16px]">
                            {errors.taskName.message}
                        </p>
                    )}

                    <div className="mt-3">
                        <label className="text-[18px] font-bold">Status</label>
                        <Controller
                            name="statusId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    style={{ width: "100%" }}
                                    defaultValue={
                                        statusData.length > 0
                                            ? statusData[0].statusId.toString()
                                            : undefined
                                    }
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                >
                                    {statusData.map((item) => (
                                        <Select.Option
                                            key={item.statusId}
                                            value={item.statusId.toString()}
                                        >
                                            {item.statusName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </div>

                    <Controller
                        name="priorityId"
                        control={control}
                        render={({ field }) => (
                            <PrioritySelect
                                {...field}
                                priorityOptions={priorityData.map((item) => ({
                                    label: item.description,
                                    value: item.priorityId,
                                }))}
                                defaultPriority={
                                    priorityData.length > 0
                                        ? priorityData[0].priorityId
                                        : undefined
                                }
                                onSelectPriority={(priority) =>
                                    field.onChange(priority)
                                }
                            />
                        )}
                    />

                    <Controller
                        name="typeId"
                        control={control}
                        render={({ field }) => (
                            <TaskTypeSelect
                                {...field}
                                taskTypeOptions={taskTypeData.map((item) => ({
                                    label: item.taskType,
                                    value: String(item.id),
                                }))}
                                defaultTaskType={
                                    taskTypeData.length > 0
                                        ? String(taskTypeData[0].taskType)
                                        : undefined
                                }
                                onSelectTaskType={(taskType) =>
                                    field.onChange(+taskType)
                                }
                                value={String(field.value)}
                            />
                        )}
                    />

                    <Controller
                        name="listUserAsign"
                        control={control}
                        render={({ field }) => (
                            <AssignersSelect
                                memberOptions={assigners.map((item) => ({
                                    label: item.name,
                                    value: item.userId,
                                }))}
                                value={field.value}
                                onChange={(values) => field.onChange(values)}
                            />
                        )}
                    />
                    {errors?.listUserAsign && (
                        <p className="text-red-500 text-xs mt-1 text-[16px]">
                            {errors.listUserAsign.message}
                        </p>
                    )}

                    <Controller
                        name="originalEstimate"
                        control={control}
                        render={({ field }) => (
                            <TimeTrackingInputs
                                key={`${field.value}-${hoursSpent}`}
                                totalEstimatedHours={field.value ?? 0}
                                hoursSpent={hoursSpent}
                                remainingHours={watch("timeTrackingRemaining")}
                                onTotalEstimatedHoursChange={(value) => {
                                    field.onChange(value);
                                }}
                                onHoursSpentChange={(value) => {
                                    setValue("timeTrackingSpent", value);
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <DescriptionEditor
                                description={field.value ?? ""}
                                onDescriptionChange={(value) => {
                                    field.onChange(value);
                                }}
                            />
                        )}
                    />

                    <div className="flex gap-3 justify-end">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Drawer>
    );
};

// tay nguyen
