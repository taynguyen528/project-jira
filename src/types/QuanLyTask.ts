export type Task = {
    lstTask: LstTask[];
    members: MemberTask[];
    creator: CreatorTask;
    id: number;
    projectName: string;
    description: string;
    projectCategory: ProjectCategory;
    alias: string;
};

export type LstTask = {
    lstTaskDeTail: LstTaskDeTail[];
    statusId: string;
    statusName: string;
    alias: string;
};

export type LstTaskDeTail = {
    priorityTask: PriorityTask;
    taskTypeDetail: TaskTypeDetail;
    assigness: Assigness[];
    lstComment: any[];
    taskId: number;
    taskName: string;
    alias: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    typeId: number;
    priorityId: number;
    projectId: number;
};

export type PriorityTask = {
    priorityId: number;
    priority: string;
};

export type TaskTypeDetail = {
    id: number;
    taskType: string;
};

export type Assigness = {
    id: number;
    avatar: string;
    name: string;
    alias: string;
};

export type MemberTask = {
    userId: number;
    name: string;
    avatar: string;
    email: any;
    phoneNumber: any;
};

export type CreatorTask = {
    id: number;
    name: string;
};

export type ProjectCategory = {
    id: number;
    name: string;
};

export type TaskTypeModel = {
    listUserAsign: number[];
    taskName: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    projectId: number;
    typeId: number;
    priorityId: number;
    taskId: number;

    taskType?: string;
    priority?: number | string | undefined;
};
