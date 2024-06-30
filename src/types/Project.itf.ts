import { UserInfo } from "types";
<<<<<<< HEAD
import { IProjectCategory } from "./ProjectCategory.itf";
=======
>>>>>>> 5b184e135bfa5a450bbd4656b581dcac4469ff58

export interface ICreator {
  name: string;
  id: number;
}

export interface IProject {
  id: number;
  alias: string;
  categoryId: number;
  categoryName: string;
  projectName: string;
  description: string;
  creator: ICreator;
  members: Partial<UserInfo>[];
}

export interface IProjectDetail {
  project: IProject;
}

export interface IProjectUpdate {
  id: number;
  projectName: string;
  creator: number;
  description: string;
  categoryId: string;
}

export interface IProjectEdit {
  project: IProject;
}

export interface IProjectActionBtns {
  project: IProject;
}

export interface IProjectMembers {
  projectID: number;
  projectName: string;
  members: Partial<UserInfo>[];
}

export interface IProjectMembersList {
  members: Partial<IMember>[];
  handleDeleteMember: (memberId: number) => void;
  containerStyle?: string;
  title?: string;
}

export interface IMember {
  userId: number;
  name: string;
  avatar: string;
}

export interface IProjectMembersAdd {
  isMobile?: boolean;
  title?: string;
  projectName?: string;
  containerClassName?: string;
  userListClassName?: string;
  handleAssignUser: (userId: number) => void;
}
