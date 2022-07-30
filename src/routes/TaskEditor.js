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

    return (
        <Box>
            <TaskAgendaTable setLoading={setLoading}/>
            <TaskEditorTable setLoading={setLoading}/>
            <Backdrop open={loading}><CircularProgress/></Backdrop>
        </Box>
    )
}