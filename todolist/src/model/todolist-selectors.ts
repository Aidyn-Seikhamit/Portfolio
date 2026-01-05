import {RootState} from "../app/store";
import {Todolist} from "../app/App";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists