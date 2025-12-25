import {TasksStateType} from "../commontypes.ts";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";

type ActionType = DeleteTodolistAT | CreateTodolistAT
export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "create_todolist" : {
            const id = action.payload.id;
            return {...tasks, [id]: []};
        }
        case "delete_todolist" : {
            const id = action.payload.id;
            const copyTasksState = { ...tasks }
            delete copyTasksState[id]
            return copyTasksState
        }
        default:
            return tasks
    }
}