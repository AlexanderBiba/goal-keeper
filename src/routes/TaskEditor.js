import {
    Box,
    Typography
} from "@mui/material";
import ViewTasks from "../tables/ViewTasks";
import SetTasks from "../tables/SetTasks";

export default function TaskEditor() {
    return (
        <Box>
            <ViewTasks/>
            <SetTasks/>
            <Typography variant="h6">You can only set tasks for tomorrow</Typography>
            <Typography variant="h6">Your can only validate today's tasks</Typography>
        </Box>
    )
}