import { Button, Modal, Input } from "antd";
import { projectApi, userAPI } from "api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MemberTask } from "types";

interface ModalAddNewUserProjectProps {
    open: boolean;
    onCancel: () => void;
    projectName: string;
    members: MemberTask[];
    idProject: string | undefined;
    fetchDataMember: () => void;
}

export const ModalAddNewUserProject: React.FC<ModalAddNewUserProjectProps> = ({
    open,
    onCancel,
    projectName,
    members,
    idProject,
    fetchDataMember,
}) => {
    const [listUser, setListUser] = useState<MemberTask[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [memberProject, setMemberProject] = useState<MemberTask[]>([]);

    const fetchData = async () => {
        try {
            const res = await userAPI.getListUser();
            setListUser(res.content);
            setMemberProject(members);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open, members]);

    const memberIds = listUser.map((member) => member.userId);
    const projectMemberIds = memberProject.map((member) => member.userId);
    const nonProjectMemberIds = memberIds.filter(
        (id) => !projectMemberIds.includes(id)
    );
    const nonProjectMembers = listUser.filter((user) =>
        nonProjectMemberIds.includes(user.userId)
    );
    const filteredNonProjectMembers = nonProjectMembers.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleButtonAdd = async (userId: number) => {
        if (idProject === undefined) {
            return;
        }

        try {
            const res = await projectApi.assignUserProject({
                projectId: +idProject,
                userId,
            });
            if (res && res.statusCode === 200) {
                toast.success(res.message);

                const addedUser = listUser.find(
                    (user) => user.userId === userId
                );
                if (addedUser) {
                    setMemberProject((prev) => [...prev, addedUser]);
                    setListUser((prev) =>
                        prev.filter((user) => user.userId !== userId)
                    );
                }
                fetchDataMember();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleButtonRemove = async (userId: number) => {
        if (idProject === undefined) {
            return;
        }

        try {
            const res = await projectApi.removeUserFromProject({
                projectId: +idProject,
                userId,
            });
            if (res && res.statusCode === 200) {
                toast.success(res.message);

                const removedUser = memberProject.find(
                    (member) => member.userId === userId
                );
                if (removedUser) {
                    setMemberProject((prev) =>
                        prev.filter((member) => member.userId !== userId)
                    );
                    setListUser((prev) => [...prev, removedUser]);
                }
            }
            fetchDataMember();
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    return (
        <div>
            <Modal
                title={
                    <div className="text-[30px]">
                        Thêm thành viên vào dự án{" "}
                        <span className="text-blue-700">{projectName}</span>
                        <hr className="mt-[10px]" />
                    </div>
                }
                centered
                open={open}
                onCancel={onCancel}
                width={1000}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Cancel
                    </Button>,
                ]}
            >
                <div className="mt-[40px]">
                    <div className="flex items-center justify-center w-full gap-[20px] text-[25px]">
                        Tìm kiếm thành viên:
                        <Input
                            style={{ width: 300 }}
                            placeholder="Search member"
                            value={searchValue}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="text-[20px] my-[30px] flex justify-between mx-auto w-[70%] px-[20px] font-bold">
                        <div>Chưa được thêm</div>
                        <div>Thành viên trong dự án</div>
                    </div>
                    <div className="flex justify-around text-[25px] px-[20px]">
                        <div
                            style={{
                                maxHeight: "300px",
                                overflowY: "auto",
                                width: "45%",
                            }}
                        >
                            <ul>
                                {filteredNonProjectMembers.map(
                                    (user, index) => (
                                        <li key={user.userId} className="mb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <img
                                                        src={user.avatar}
                                                        alt="img"
                                                        className="w-[40px] h-[40px] rounded-full mr-[10px]"
                                                    />
                                                    <div className="flex flex-col ml-4">
                                                        <span className="text-[18px] text-black/[.85]">
                                                            {user.name}
                                                        </span>
                                                        <span className="text-[14px] text-gray-400 opacity-8">
                                                            User id:{" "}
                                                            {user.userId}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="primary"
                                                    className="mr-4"
                                                    onClick={() =>
                                                        handleButtonAdd(
                                                            user.userId
                                                        )
                                                    }
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                            {index <
                                                filteredNonProjectMembers.length -
                                                    1 && (
                                                <hr className="my-3" />
                                            )}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto w-[45%]">
                            <ul>
                                {memberProject.map((member, index) => (
                                    <li key={member.userId} className="mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    src={member.avatar}
                                                    alt="img"
                                                    className="w-[40px] h-[40px] rounded-full mr-[10px]"
                                                />
                                                <div className="flex flex-col mx-4">
                                                    <span className="text-[18px] text-black/[.85]">
                                                        {member.name}
                                                    </span>
                                                    <span className="text-[14px] text-gray-400 opacity-8">
                                                        User id: {member.userId}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                type="primary"
                                                danger
                                                className="mr-4"
                                                onClick={() =>
                                                    handleButtonRemove(
                                                        member.userId
                                                    )
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        {index < memberProject.length - 1 && (
                                            <hr className="my-3" />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
