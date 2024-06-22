import { Button, Modal, Input } from "antd";
import { userAPI } from "api";
import { useEffect, useState } from "react";
import { MemberTask } from "types";

interface ModalAddNewUserProjectProps {
    open: boolean;
    onCancel: () => void;
    projectName: string;
    members: MemberTask[];
}

export const ModalAddNewUserProject: React.FC<ModalAddNewUserProjectProps> = ({
    open,
    onCancel,
    projectName,
    members,
}) => {
    const [listUser, setListUser] = useState<MemberTask[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const memberProject = [...members];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userAPI.getListUser();
                setListUser(res.content);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

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
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius:
                                                                "999px",
                                                            marginRight: "10px",
                                                        }}
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
                        <div
                            style={{
                                maxHeight: "300px",
                                overflowY: "auto",
                                width: "45%",
                            }}
                        >
                            <ul>
                                {memberProject.map((member, index) => (
                                    <li key={member.userId} className="mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    src={member.avatar}
                                                    alt="img"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "999px",
                                                        marginRight: "10px",
                                                    }}
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
