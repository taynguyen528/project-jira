// import redux
import { useAppDispatch } from "store";
import { spinnerActions } from "../../store/quanLySpinner/spinnerSlice";

// import local services
import { projectAPI } from "../../api/projectApi";

// import local component interface
import { IProjectMembers } from "../../types/Project.itf";
import { UserInfo, UserUpdate } from "../../types/QuanLyUser";

// import local compoment
import { ProjMgmtMembersAddTemplate } from "./ProjMgmtMembersAddTemplate";
import { ProjMgmtMembersListTemplate } from "./ProjMgmtMembersListTemplate";

// import antd component
import { Avatar, message, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// local Render
export const renderMembers = (members: Partial<UserInfo>[]) => {
  const totalMembers = members.length;
  if (totalMembers === 0) return null;
  if (totalMembers <= 2) {
    return members.map((member, index) => (
      <Avatar src={member.avatar} key={member.userId!.toString() + index} />
    ));
  }
  const membersExcludeLast = members.slice(0, 2);

  return (
    <>
      {membersExcludeLast.map((member, index) => (
        <Avatar src={member.avatar} key={member.userId!.toString() + index} />
      ))}

      <Avatar className="inline-flex justify-center items-center bg-orange-100 text-orange-500 text-base">
        +{totalMembers - 2}
      </Avatar>
    </>
  );
};

export function ProjMgmtMembersTemplate({
  projectID: projectId,
  projectName,
  members,
}: IProjectMembers) {
  const dispatch = useAppDispatch();

  const handleAssignUser = (userId: number) => {
    dispatch(spinnerActions.setLoadingOn());
    projectAPI
      .assignUserProject({ projectId, userId })
      .then((res) => {
        // console.log(res);
        dispatch(projectAPI.getAllAndDispatch("Member added successfully"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(spinnerActions.setLoadingOff());
      });
  };

  const handleDeleteMember = (memberId: number) => {
    dispatch(spinnerActions.setLoadingOn());
    projectAPI
      .removeUserFromProject({ projectId, userId: memberId })
      .then((res) => {
        // console.log(res);
        dispatch(projectAPI.getAllAndDispatch("Member deleted"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(spinnerActions.setLoadingOff());
      });
  };

  return (
    <div className="flex items-center">
      <Popover
        className="cursor-pointer"
        placement="top"
        content={
          <ProjMgmtMembersListTemplate
            members={members}
            handleDeleteMember={handleDeleteMember}
          />
        }
        trigger="click"
      >
        <div className="flex">
          <Avatar.Group size={40}>{renderMembers(members)}</Avatar.Group>
        </div>
      </Popover>
      <Popover
        placement="right"
        content={
          <ProjMgmtMembersAddTemplate
            projectName={projectName}
            handleAssignUser={handleAssignUser}
          />
        }
        trigger="click"
        destroyTooltipOnHide={true}
      >
        <div className="w-10 h-10 ml-2 flex justify-center items-center bg-green-500 hover:bg-green-700 rounded-full text-white cursor-pointer transition duration-300">
          <PlusOutlined style={{ fontSize: "1rem" }} />
        </div>
      </Popover>
    </div>
  );
}
