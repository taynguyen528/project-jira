import { useEffect } from "react";
import { Breadcrumb, Tooltip } from "antd";
import { projectApi } from "api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MemberTask } from "types";
import { UserAddOutlined } from "@ant-design/icons";
import { ModalAddNewUserProject } from "components";

export const BoardTemplate = () => {
  const { idProject } = useParams();
  const [projectName, setProjectName] = useState<string>("");
  const [members, setMembers] = useState<MemberTask[]>([]);
  const [openModalAddUser, setOpenModalAddUser] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (idProject) {
        const res = await projectApi.getProjectDetail(+idProject);
        setProjectName(res.content.projectName);
        setMembers(res.content.members);
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

  const handleCancelModal = () => {
    setOpenModalAddUser(false);
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
      <div className="flex ">
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
          onCancel={handleCancelModal}
          projectName={projectName}
          members={members}
          idProject={idProject}
        />
      </div>
    </div>
  );
};
