import type {TasksState} from '../app/App'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('task/deleteTask');
export const createTaskAC = createAction<{todolistId: string, title: string }>('task/createTask');
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('task/changeTaskStatus');
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('task/changeTaskTitle');

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder)=>{
  builder
      .addCase(deleteTodolistAC, (state, action)=>{
        delete state[action.payload.id];
      })
      .addCase(createTodolistAC, (state, action) =>{
        state[action.payload.id] = []
      })
      .addCase(deleteTaskAC, (state, action) =>{
        const { todolistId, taskId } = action.payload
        state[todolistId] = state[todolistId].filter(t => t.id !== taskId)
      })
      .addCase(createTaskAC, (state, action) =>{
        const { todolistId, title } = action.payload;
        state[todolistId].push({
          title,
          id: nanoid(),
          isDone: false,
        })
      })
      .addCase(changeTaskStatusAC, (state, action) =>{
        const { todolistId, taskId, isDone} = action.payload;
        state[todolistId] = state[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
      })
      .addCase(changeTaskTitleAC, (state, action) =>{
        const { todolistId, taskId, title} = action.payload;
        state[todolistId] = state[todolistId].map(task => task.id === taskId ? {...task, title: title} : task)
      })
})