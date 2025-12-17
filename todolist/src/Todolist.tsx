import {Box, Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material"
import { FilterValuesType, Task, TodolistType } from "./commontypes"
import { CreateItemForm } from "./CreateItemForm"
import { EditableSpan } from "./EditableSpan"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {container, getListItemSx} from "./Todolist.styles.ts";

type PropsType = {
    todolistId: TodolistType["id"]
    title: string
    tasks: Task[]
    filter: FilterValuesType
    deletTask: (taskId: Task["id"], todolistId: TodolistType["id"]) => void
    deleteTodolist: (todolistId: TodolistType["id"]) => void
    changeTodolistFilter: (nextFilterValue: FilterValuesType, todolistId: TodolistType["id"]) => void
    createTask: (title: Task["title"], todolistId: TodolistType["id"]) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task["isDone"], todolistId: TodolistType["id"]) => void
    changeTodolistTitle: (title: TodolistType["title"], todolistId: TodolistType["id"]) => void
    changeTaskTitle: (taskId: Task["id"], title: Task["title"], todolistId: TodolistType["id"]) => void
}



export function Todolist(props: PropsType) {
    const {
        todolistId,
        title,
        tasks,
        filter,
        deletTask,
        createTask,
        deleteTodolist,
        changeTaskStatus,
        changeTodolistFilter,
        changeTodolistTitle,
        changeTaskTitle
    } = props

    const tasksList = tasks.length === 0
        ? <span>Your taskslist is empty</span>
        : <List>
            {tasks.map(t => {
                const changeTaskTitleHandler = (newTitle: Task["title"]) => changeTaskTitle(t.id, newTitle, todolistId)
                const deletTaskHandler = () => deletTask(t.id, todolistId)
                return (
                    <ListItem sx={container}
                        disablePadding
                    >
                        <Checkbox
                            size="small"
                            onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked, todolistId)}
                            checked={t.isDone}
                        />
                        <Box sx={getListItemSx(t.isDone)}>
                            <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler} />
                        </Box>
                        <IconButton
                            size="small"
                            onClick={deletTaskHandler}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>

    const createTaskHandler = (taskTitle: Task["title"]) => createTask(taskTitle, todolistId)

    const deleteTodolisthandler = () => deleteTodolist(todolistId)

    const changeTodolistTitleHandler = (newTitle: TodolistType["title"]) => changeTodolistTitle(newTitle, todolistId)


    return (
        <div>
            <Typography variant={"h5"} sx={container}>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
                <IconButton
                    size="small"
                    onClick={deleteTodolisthandler}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </Typography>
            <CreateItemForm createItem={createTaskHandler} maxTitleLength={10} />
            {tasksList}
            <Box sx={container}>
                <div>
                    <Button
                        variant="contained"
                        color={filter === "all" ? "secondary" : "primary"}
                        size="small"
                        disableElevation
                        onClick={() => changeTodolistFilter("all", todolistId)}
                    >
                        Все
                    </Button>
                    <Button
                        variant="contained"
                        color={filter === "active" ? "secondary" : "primary"}
                        size="small"
                        disableElevation
                        onClick={() => changeTodolistFilter("active", todolistId)}
                    >
                        В работе
                    </Button>
                    <Button
                        variant="contained"
                        color={filter === "completed" ? "secondary" : "primary"}
                        size="small"
                        disableElevation
                        onClick={() => changeTodolistFilter("completed", todolistId)}
                    >
                        Сделано
                    </Button>



                </div>
            </Box>
        </div>
    )
}