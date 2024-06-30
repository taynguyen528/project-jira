import { useState } from "react";
import { UserInfo } from "types";
import { useEffect } from "react";
import { userAPI } from "api";
import { UserTableTemplate } from "./UserTableTemplate";
import { UserActionTemplate } from "./UserActionTemplate";

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
    <div className="container mx-auto pt-16">
      <h1 className="text-center text-3xl">User Management</h1>

      <UserTableTemplate userList={userList} />
    </div>
  );
}
