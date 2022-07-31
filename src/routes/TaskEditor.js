import {
    Box,
    Backdrop,
    CircularProgress
} from "@mui/material";
import TaskAgendaTable from "../tables/TaskAgendaTable";
import TaskEditorTable from "../tables/TaskEditorTable";
import { useState } from "react";

export default function TaskEditor() {
    const [loading, setLoading] = useState(true);

    const addLoadingComponent = (remainingComponents => () => {
        remainingComponents++;
        return () => (!--remainingComponents) && setLoading(false);
    })(0)

    return (
        <Box>
            <TaskAgendaTable renderDone={addLoadingComponent()}/>
            <TaskEditorTable renderDone={addLoadingComponent()}/>
            <Backdrop open={loading}><CircularProgress/></Backdrop>
        </Box>
    )
}