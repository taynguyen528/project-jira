// Priority
// ProjectCategory
// Status
// TaskType

import { publicClient } from "constant/configAxios"

export const optionApi = {
    getAllTaskType: () => {
        return publicClient.get('TaskType/getAll')
    }
}