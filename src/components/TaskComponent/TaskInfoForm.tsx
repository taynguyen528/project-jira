import { Button, Input } from "antd";
import { DescriptionEditor } from "./DescriptionEditor";
import { CommentComponent } from "./CommentComponent";

interface TaskInfoFormProps {
    taskId: number;
    taskName: string;
    description: string;
    isTaskNameChanged: boolean;
    isDescriptionChanged: boolean;
    handleTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (value: string) => void;
    handleUpdateTask: (data: any) => void;
}

export const TaskInfoForm: React.FC<TaskInfoFormProps> = ({
    taskId,
    taskName,
    description,
    isTaskNameChanged,
    isDescriptionChanged,
    handleTaskNameChange,
    handleDescriptionChange,
    handleUpdateTask,
}) => (
    <div className="w-full">
        <div className="flex">
            <Input value={taskName} onChange={handleTaskNameChange} />
            <Button
                type="primary"
                className="ml-[20px]"
                disabled={!isTaskNameChanged}
                onClick={() => handleUpdateTask({ taskName })}
            >
                Submit
            </Button>
        </div>
        <div>
            <DescriptionEditor
                description={description}
                onDescriptionChange={handleDescriptionChange}
            />
            <div className="flex justify-end">
                <Button
                    type="primary"
                    onClick={() => handleUpdateTask({ description })}
                    disabled={!isDescriptionChanged}
                >
                    Save
                </Button>
            </div>
        </div>
        <div>
            <label className="text-[18px] font-bold">Comment</label>
            <CommentComponent taskId={taskId} />
        </div>
    </div>
);
