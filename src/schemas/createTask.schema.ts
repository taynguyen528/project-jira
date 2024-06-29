import { z } from "zod";

export const createTaskSchema = z.object({
    listUserAsign: z
        .array(z.number())
        .nonempty("ListUser phải chứa ít nhất một người thực hiện task."),
    taskName: z.string().min(1, "Task name không được để trống."),
    description: z.string().min(1, "Description không được để trống."),
    statusId: z.string().min(1, "Status ID không được để trống."),
    originalEstimate: z.number(),
    timeTrackingSpent: z.number(),
    timeTrackingRemaining: z.number(),
    projectId: z.number(),
    typeId: z.number(),
    priorityId: z.number(),
});

export type TaskType = z.infer<typeof createTaskSchema>;
