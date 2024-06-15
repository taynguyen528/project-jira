import React, { useEffect, useState } from "react";
import { Drawer, Button, Select, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ContentProject, StatusType, TaskType } from "types";
import { optionApi, projectApi } from "api";
import { PriorityType } from "types/QuanLyPriority";

interface CreateTaskProps {
  onClose: () => void;
  open: boolean;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ onClose, open }) => {
  const [dataProject, setDataProject] = useState<ContentProject[]>([]);
  const [statusData, setStatusData] = useState<StatusType[]>([]);
  const [priorityData, setPriorityData] = useState<PriorityType[]>([]);
  const [taskTypeData, setTaskTypeData] = useState<TaskType[]>([]);

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

  useEffect(() => {
    fetchDataProject();
    fetchStatus();
    fetchPriority();
    fetchTaskType();
  }, []);

  // select project
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const projectOptions = dataProject.map((item) => ({
    value: item.alias,
    label: item.alias,
  }));

  // select status
  const statusOptions = statusData.map((item) => ({
    value: item.statusName,
    label: item.statusName,
  }));

  // select priority
  const priorityOptions = priorityData.map((item) => ({
    value: item.priority,
    label: item.description,
  }));

  // select taskType
  const taskTypeOptions = taskTypeData.map((item) => ({
    label: item.taskType,
    value: item.taskType,
  }));

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
        <form>
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
              />
            </div>
            <p className="text-red-500">
              *{" "}
              <span className="italic">
                You can only create tasks of your own projects!
              </span>
            </p>
          </div>

          <div>
            <label className="text-[18px] font-bold">Task name</label>
            <div className="mt-2">
              <Input placeholder="Task name" />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-[18px] font-bold">Status</label>
            <div className="mt-2">
              <Select
                style={{ width: "100%" }}
                options={statusOptions}
                defaultValue={
                  statusOptions.length > 0 ? statusOptions[0].value : undefined
                }
              />
            </div>
          </div>

          <div className="mt-3 flex gap-4">
            <div className="w-1/2">
              <label className="text-[18px] font-bold">Priority</label>
              <div className="mt-2">
                <Select
                  style={{ width: "100%" }}
                  options={priorityOptions}
                  defaultValue={
                    priorityOptions.length > 0 ? priorityOptions[0] : undefined
                  }
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="text-[18px] font-bold">Task Type</label>
              <div className="mt-2">
                <Select
                  style={{ width: "100%" }}
                  options={taskTypeOptions}
                  defaultValue={
                    taskTypeOptions.length > 0 ? taskTypeOptions[0] : undefined
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <label className="text-[18px] font-bold">Assigners</label>
            <div className="mt-2">
              <Select style={{ width: "100%" }} />
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
