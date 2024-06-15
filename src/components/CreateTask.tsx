import React, { useEffect, useState } from "react";
import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { projectApi } from "api/projectApi";
import { ContentProject } from "types";

interface CreateTaskProps {
    onClose: () => void;
    open: boolean;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ onClose, open }) => {
    const [dataProject, setDataProject] = useState<ContentProject[]>([]);

    const fetchDataProject = async () => {
        try {
            const res = await projectApi.getAllProject();
            setDataProject(res.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataProject();
    }, []);

    return (
        <Drawer
            onClose={onClose}
            open={open}
            width={700}
            closeIcon={null}
            title={
                <div className="flex justify-between items-center w-full">
                    <div className="text-[20px] font-semibold">Create Task</div>
                    <Button
                        type="text"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        icon={<CloseOutlined />}
                    />
                </div>
            }
        >
            <div>
                <form>
                    <div>
                        <label>Project</label>
                        <div></div>
                    </div>
                </form>
            </div>
        </Drawer>
    );
};
