
import {SxProps} from "@mui/material";

export const container: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    textDecoration: isDone ? "line-through" : "none",
    opacity: isDone ? 0.5 : 1,
})