import { ProjMgmtMembersAddTemplate } from "projMgmtTpl";
import { IProjectMembersAdd } from "types";

export const ProjMgmtMembersAdd = ({
  isMobile = false,
  title,
  projectName,
  handleAssignUser,
  containerClassName = "w-64",
  userListClassName = "max-h-96",
}: IProjectMembersAdd) => {
  return (
    <ProjMgmtMembersAddTemplate
      isMobile={isMobile}
      title={title}
      projectName={projectName}
      handleAssignUser={handleAssignUser}
      containerClassName={containerClassName}
      userListClassName={userListClassName}
    />
  );
};
