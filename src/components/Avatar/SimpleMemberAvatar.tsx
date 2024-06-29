import { Avatar } from "antd";

/* import local interface */
import { IProject } from "../../types/Project.itf";

export const SimpleMemberAvatar = ({ members }: Partial<IProject>) => {
  const renderAvatar = () => {
    if (members && members.length > 0) {
      return members.map((member, idx) => (
        <Avatar
          src={member.avatar}
          key={(Math.floor(Math.random() * 100) + 1).toString() + idx}
        />
      ));
    }
    return null;
  };

  return <>{renderAvatar()}</>;
};
