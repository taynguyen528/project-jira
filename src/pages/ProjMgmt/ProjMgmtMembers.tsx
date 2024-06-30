import { ProjMgmtMembersTemplate } from "projMgmtTpl";
import { IProjectMembers } from "types";

export const ProjMgmtMembers = ({
  projectID,
  projectName,
  members,
}: IProjectMembers) => {
  return (
    <ProjMgmtMembersTemplate
      projectID={projectID}
      projectName={projectName}
      members={members}
    />
  );
};
