import { ProjMgmtMembersListTemplate } from "template/ProjMgmt";
import { IProjectMembersList } from "types";

export const ProjMgmtMembersList = ({
  members,
  handleDeleteMember,
  containerStyle = "w-64",
  title = "ALL MEMBERS",
}: IProjectMembersList) => {
  return (
    <ProjMgmtMembersListTemplate
      members={members}
      handleDeleteMember={handleDeleteMember}
      containerStyle={containerStyle}
      title={title}
    />
  );
};
