import { useEffect, useState } from "react";
import { Breadcrumb, Button, Tooltip } from "antd";
import { projectApi } from "api";
import { useNavigate, useParams } from "react-router-dom";
import { Assigness, LstTask, LstTaskDeTail, MemberTask } from "types";
import { UserAddOutlined } from "@ant-design/icons";
import { CreateTask, ModalAddNewUserProject, ModalTaskDetail } from "components";

export const BoardTemplate = () => {
  const { idProject } = useParams<{ idProject: string }>();
  const [projectName, setProjectName] = useState<string>("");
  const [members, setMembers] = useState<MemberTask[]>([]);
  const [openModalAddUser, setOpenModalAddUser] = useState<boolean>(false);
  const [listTask, setListTask] = useState<LstTask[]>([]);
  const [openModalTaskDetail, setOpenModalTaskDetail] =
    useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<LstTaskDeTail | null>(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (idProject) {
        const res = await projectApi.getProjectDetail(+idProject);
        setProjectName(res.content.projectName);
        setMembers(res.content.members);
        setListTask(res.content.lstTask);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idProject]);

  const handleButtonAddUserProject = () => {
    setOpenModalAddUser(true);
  };

  const handleCancelModalAddNewUserProject = () => {
    setOpenModalAddUser(false);
  };

  const handleCancelModalTaskDetail = () => {
    setOpenModalTaskDetail(false);
    setSelectedTask(null);
  };

  const getStatusColor = (statusName: string) => {
    switch (statusName) {
      case "BACKLOG":
        return "bg-gray-200";
      case "SELECTED FOR DEVELOPMENT":
        return "bg-[#c7d2fe]";
      case "IN PROGRESS":
        return "bg-[#bfdbfe]";
      default:
        return "bg-[#a7f3d0]";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      case "Lowest":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getTaskTypeColor = (taskType: string) => {
    switch (taskType) {
      case "bug":
        return "text-red-500";
      case "new task":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getContentDesc = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Create task
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const renderTasks = (tasks: LstTaskDeTail[]) => {
    return tasks.map((task: LstTaskDeTail) => (
      <div
        key={task.taskId}
        className="p-2 bg-white rounded-lg shadow mb-2 cursor-pointer"
        onClick={() => {
          setSelectedTask(task);
          setOpenModalTaskDetail(true);
        }}
      >
        <div className="font-semibold">{task.taskName}</div>
        <div className="flex items-center">
          <div className="text-sm text-gray-600">
            {getContentDesc(task.description)}
          </div>
          <div
            className={`ml-auto mr-1 font-bold ${getTaskTypeColor(
              task.taskTypeDetail.taskType
            )}`}
          >
            {task.taskTypeDetail.taskType}
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div
            className={`mr-auto text-[18px] font-bold ${getPriorityColor(
              task.priorityTask.priority
            )}`}
          >
            {task.priorityTask.priority}
          </div>
          {task.assigness.map((assignee: Assigness) => (
            <Tooltip key={assignee.id} placement="top" title={assignee.name}>
              <img
                className="rounded-full w-[30px] h-[30px] cursor-pointer mr-1"
                src={assignee.avatar}
                alt="assigneeAvatar"
              />
            </Tooltip>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto">
      <div className="mb-[10px]">
        <Breadcrumb
          items={[
            {
              title: (
                <div
                  className="text-[16px] text-blue-700 opacity-80 cursor-pointer"
                  onClick={() => {
                    navigate("/project");
                  }}
                >
                  Project
                </div>
              ),
            },
            {
              title: (
                <div className="text-[16px] text-blue-700 opacity-80">
                  Board
                </div>
              ),
            },
            {
              title: (
                <div className="text-[16px] text-blue-700 opacity-80">
                  {projectName}
                </div>
              ),
            },
          ]}
          separator={
            <div className="flex justify-center items-center">
              <img
                src="/icon/breadcrumb.png"
                alt="breadcrumb"
                className="h-[16px] w-[16px]"
              />
            </div>
          }
        />
      </div>
      <div className="flex">
        <div className="w-1/2 text-[28px]">Project name: {projectName}</div>
        <div className="w-1/2 text-[28px] flex items-center gap-[10px]">
          Member:
          <div className="flex gap-[10px]">
            {members &&
              members.length > 0 &&
              members.map((member) => (
                <div key={member.userId}>
                  <Tooltip placement="top" title={member.name}>
                    <img
                      className="rounded-full w-[40px] cursor-pointer"
                      src={member.avatar}
                      alt="memberAvatar"
                    />
                  </Tooltip>
                </div>
              ))}
          </div>
          <div
            className="text-[25px] border-[2px] border-solid w-[40px] h-[40px] rounded-full flex items-center justify-center p-[10px] cursor-pointer border-gray-300 transition duration-500 ease-in-out hover:border-blue-500"
            onClick={handleButtonAddUserProject}
          >
            <UserAddOutlined />
          </div>
        </div>
        <ModalAddNewUserProject
          open={openModalAddUser}
          onCancel={handleCancelModalAddNewUserProject}
          projectName={projectName}
          members={members}
          idProject={idProject}
          fetchDataMember={fetchData}
        />
      </div>
      <div className="mt-[20px]">
        <Button type="primary" onClick={showDrawer}>
          Create Task
        </Button>
        <CreateTask onClose={onClose} open={open} />
      </div>
      <div className="flex gap-4 w-full mt-[50px]">
        {listTask.map((taskGroup) => (
          <div
            key={taskGroup.statusId}
            className="max-h-[600px] overflow-y-auto bg-[#f3f4f6] flex-1 rounded-lg cursor-pointer"
          >
            <span
              className={`inline-block text-semibold px-3 text-[18px] mt-2.5 ml-2.5 mb-[10px] rounded-lg ${getStatusColor(
                taskGroup.statusName
              )}`}
            >
              {taskGroup.statusName}
            </span>
            <div className="p-2">{renderTasks(taskGroup.lstTaskDeTail)}</div>
          </div>
        ))}
      </div>
      {selectedTask && (
        <ModalTaskDetail
          open={openModalTaskDetail}
          onCancel={handleCancelModalTaskDetail}
          taskId={selectedTask.taskId}
          members={members}
          onTaskDeleted={fetchData}
        />
      )}
    </div>
  );
};
