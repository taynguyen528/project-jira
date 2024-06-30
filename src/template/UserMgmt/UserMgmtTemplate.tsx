import { useState } from "react";
import { UserInfo } from "types";
import { useEffect } from "react";
import { userAPI } from "api";
import { UserTableTemplate } from "./UserTableTemplate";
import { UserActionTemplate } from "./UserActionTemplate";
import clsx from "clsx";
import { SectionWrapper } from "components";

export default function UserMgmtTemplate() {
  const [userList, setUserList] = useState<UserInfo[]>([]);

  useEffect(() => {
    let fetchUserList = async () => {
      try {
        const res = await userAPI.getAllUser();
        const data = res.content.map((user) => {
          return {
            ...user,
            action: (
              <UserActionTemplate onSuccess={fetchUserList} user={user} />
            ),
          };
        });
        setUserList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserList();
  }, []);

  return (
    <SectionWrapper
      content={
        <>
          <div className="mb-2 flex justify-between items-center">
            <h3
              className={clsx(
                "title",
                "uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide"
              )}
            >
              User Management
            </h3>
          </div>
          <UserTableTemplate userList={userList} />
        </>
      }
      sectionClass="dataManagement"
      contentClass="dataManagement__content"
    />
  );
}
