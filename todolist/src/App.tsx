import {useReducer, useState} from 'react'
import './App.css'
import { FilterValuesType, Task, TodolistType } from './commontypes'
import { Todolist } from './Todolist'
import { v1 } from 'uuid';
import { CreateItemForm } from './CreateItemForm';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider} from '@mui/material';
import {container} from "./Todolist.styles.ts";
import {NavButton} from "./NavButton.ts";
import {amber, green} from "@mui/material/colors";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC, createTodolistAC,
  deleteTodolistAC,
  todolistsReducer
} from "./model/todolists-reducer.ts";
import {tasksReducer} from "./model/task-reducer.ts";

//CRUD

function App() {
  // BLL
  const todolistId_1 = v1()
  const todolistId_2 = v1()
  // const [todolists, setTodolists] = useState<TodolistType[]>([
  //   { id: todolistId_1, title: "What to learn", filter: "all" },
  //   { id: todolistId_2, title: "What to buy", filter: "all" },
  // ])

  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" }
  ])

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistId_1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "JS/TS", isDone: true },
      { id: v1(), title: "REACT JS", isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: "Meat", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
    ],
  })

  // const [tasks, setTasks] = useState<TasksStateType>({
  //   [todolistId_1]: [
  //     { id: v1(), title: "HTML", isDone: true },
  //     { id: v1(), title: "JS/TS", isDone: true },
  //     { id: v1(), title: "REACT JS", isDone: false },
  //   ],
  //   [todolistId_2]: [
  //     { id: v1(), title: "Meat", isDone: true },
  //     { id: v1(), title: "Milk", isDone: true },
  //     { id: v1(), title: "Bread", isDone: false },
  //   ],
  // })

  // tasks
  // C +
  // R +
  // U +?
  // D +
  const deleteTask = (taskId: Task["id"], todolistId: TodolistType["id"]) => {
    // //1. Иммютабельное создание нового состояния (nextState)
    // const currentTaskArray: Task[] = tasks[todolistId]
    // const filteredCurrentTasks: Task[] = currentTaskArray.filter(t => t.id !== taskId)
    // const nextState: TasksStateType = { ...tasks }
    // nextState[todolistId] = filteredCurrentTasks
    // //2. Передать nextState для пререрисовки в React с помощью setState
    // setTasks(nextState)

    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    })
  }
  const createTask = (title: Task["title"], todolistId: TodolistType["id"]) => {
    //1. Иммютабельное создание нового состояния (nextState)
    const newTask: Task = {
      id: v1(),
      title: title,
      isDone: false
    }
    // const currentTaskArray: Task[] = tasks[todolistId]
    // const addedCurrentTasks = [...currentTaskArray, newTask]
    // const nextState = { ...tasks }
    // nextState[todolistId] = addedCurrentTasks
    ////2. Передать nextState для пререрисовки в React с помощью setState
    // setTasks(nextState)

    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId], newTask]
    })
  }
  const changeTaskStatus = (taskId: Task["id"], isDone: Task["isDone"], todolistId: TodolistType["id"]) => {
    //1. Иммютабельное создание нового состояния и Передать nextState для пререрисовки в React с помощью setState
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t)
    })
  }
  const changeTaskTitle = (taskId: Task["id"], title: Task["title"], todolistId: TodolistType["id"]) => {
    //1. Иммютабельное создание нового состояния и Передать nextState для пререрисовки в React с помощью setState
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, title } : t)
    })
  }

  // todolists
  // C +
  // R +
  // U +?
  // D +
  const changeTodolistFilter = (nextFilterValue: FilterValuesType, todolistId: TodolistType["id"]) => {
    dispatchTodolists(changeTodolistFilterAC({id: todolistId, filter: nextFilterValue}))
  }
  const changeTodolistTitle = (title: TodolistType["title"], todolistId: TodolistType["id"]) => {
    dispatchTodolists(changeTodolistTitleAC({id: todolistId, title}))
  }
  const deleteTodolist = (todolistId: TodolistType["id"]) => {
    const action = deleteTodolistAC(todolistId)
    dispatchTodolists(action)
    dispatchTasks(action)
  }
  const createTodolist = (title: TodolistType["title"]) => {
    const action = createTodolistAC(title)
    dispatchTodolists(action)
    dispatchTasks(action)
  }

  //GUI

  const todolistComponents = todolists.map(tl => {

    let filteredTasks: Task[] = tasks[tl.id]
    if (tl.filter === "active") {
      filteredTasks = filteredTasks.filter(t => !t.isDone)
    }
    if (tl.filter === "completed") {
      filteredTasks = filteredTasks.filter(t => t.isDone)
    }

    return (
      <Grid key={tl.id}>
        <Paper elevation={8}
        sx={{p: "15px"}}>
          <Todolist
            todolistId={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={filteredTasks}
            deletTask={deleteTask}
            createTask={createTask}
            deleteTodolist={deleteTodolist}
            changeTaskStatus={changeTaskStatus}
            changeTodolistFilter={changeTodolistFilter}
            changeTodolistTitle={changeTodolistTitle}
            changeTaskTitle={changeTaskTitle}
          />
        </Paper>
      </Grid>
    )
  })

 const [isDark, setIsDark] = useState(false)

  const theme = createTheme({
    palette: {
      primary: green,
      secondary: amber,
      mode: isDark ? "dark" : "light",
    },
  })
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
      <AppBar position="static">
        <Toolbar sx={container}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign out</NavButton>
            <NavButton background={theme.palette.secondary.dark}>FAQ</NavButton>
            <Switch onChange={()=>setIsDark(!isDark)}/>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grid container sx={{p: "15px 0"}}>
          <CreateItemForm createItem={createTodolist} maxTitleLength={10} />
        </Grid>
        <Grid container spacing={4}>
          {todolistComponents}
        </Grid>
      </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
