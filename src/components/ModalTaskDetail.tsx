import { Button, Modal, Tooltip, Progress } from "antd";
import { LstTaskDeTail } from "types";

interface ModalTaskDetailProps {
    open: boolean;
    onCancel: () => void;
    task: LstTaskDeTail;
}

export const ModalTaskDetail: React.FC<ModalTaskDetailProps> = ({
    open,
    onCancel,
    task,
}) => {
    const getContentDesc = (html: string) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    return (
        <Modal
            title="Task Detail"
            centered
            width={1000}
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
            ]}
        >
            <div>
                <h2 className="font-semibold text-xl mb-4">{task.taskName}</h2>
                <p className="mb-4">{getContentDesc(task.description)}</p>
                <div className="mb-4">
                    <span className="font-semibold">Priority: </span>
                    <span
                        className={`font-bold ${getPriorityColor(
                            task.priorityTask.priority
                        )}`}
                    >
                        {task.priorityTask.priority}
                    </span>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Task Type: </span>
                    <span
                        className={`font-bold ${getTaskTypeColor(
                            task.taskTypeDetail.taskType
                        )}`}
                    >
                        {task.taskTypeDetail.taskType}
                    </span>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Assigned to: </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {task.assigness.map((assignee) => (
                            <Tooltip
                                key={assignee.id}
                                placement="top"
                                title={assignee.name}
                            >
                                <img
                                    className="rounded-full w-[30px] h-[30px] cursor-pointer"
                                    src={assignee.avatar}
                                    alt={assignee.name}
                                />
                            </Tooltip>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Original Estimate: </span>
                    <span>{task.originalEstimate} hours</span>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Time Spent: </span>
                    <span>{task.timeTrackingSpent} hours</span>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Time Remaining: </span>
                    <span>{task.timeTrackingRemaining} hours</span>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Time Tracking: </span>
                    <Progress
                        percent={
                            (task.timeTrackingSpent /
                                (task.timeTrackingSpent +
                                    task.timeTrackingRemaining)) *
                            100
                        }
                        format={(percent) => `${percent.toFixed(2)}%`}
                    />
                </div>
            </div>
        </Modal>
    );
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "High":
            return "text-red-500";
        case "Medium":
            return "text-yellow-500";
        case "Low":
            return "text-green-500";
        case "Lowest":
            return "text-gray-500";
        default:
            return "text-gray-500";
    }
};

const getTaskTypeColor = (taskType: string) => {
    switch (taskType) {
        case "bug":
            return "text-red-500";
        case "new task":
            return "text-blue-500";
        default:
            return "text-gray-500";
    }
};
