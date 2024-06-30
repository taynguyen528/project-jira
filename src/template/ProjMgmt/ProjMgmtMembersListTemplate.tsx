// import local Interface
import { IMember, IProjectMembersList } from "types";

// import ant component
import { Avatar, Popconfirm } from "antd";
import {
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export function ProjMgmtMembersListTemplate({
  members,
  handleDeleteMember,
  containerStyle = "w-64",
  title = "ALL MEMBERS",
}: IProjectMembersList) {

  // render function
  const renderDelBtn = (member: Partial<IMember>) => (
    <Popconfirm
      title={
        <span className="text-lg pl-1">
          Are you sure to delete{" "}
          <span className="font-semibold">{member.name}</span>?
        </span>
      }
      onConfirm={() => {
        handleDeleteMember(member.userId!);
      }}
      okText="Yes"
      okButtonProps={{
        type: "default",
        danger: true,
        size: "large",
        className: "btn-delete-ok",
      }}
      cancelText="No"
      cancelButtonProps={{
        type: "primary",
        size: "large",
        className: "btn-delete-cancel",
      }}
      icon={<QuestionCircleOutlined className="top-1 text-red-500 text-xl" />}
    >
      <CloseCircleOutlined
        style={{ fontSize: 20 }}
        className="text-red-500 cursor-pointer"
      />
    </Popconfirm>
  );
  
  return (
    <div className={containerStyle}>
      <p className="w-full mb-0 px-2 bg-gray-200 text-sm text-gray-500 font-bold">
        {title}
      </p>
      <div className="w-full max-h-96 overflow-y-auto">
        {members.map((member, index) => (
          <div
            className="px-3 py-2 flex justify-between items-center hover:bg-slate-100"
            key={member.userId!.toString() + index}
          >
            <div className="flex items-center">
              <div>
                <Avatar src={member.avatar} />
              </div>
              <p className="ml-2 mb-0 pr-2 align-middle text-lg">
                {member.name}
              </p>
            </div>
            {renderDelBtn(member)}
          </div>
        ))}
      </div>
    </div>
  );
}
