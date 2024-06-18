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
    lstTaskDeTail: any[];
    statusId: string;
    statusName: string;
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

export type CreateTaskType = {
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
};
