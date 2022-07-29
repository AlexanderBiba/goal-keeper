import {
    Box,
    Typography
} from "@mui/material";
import SetGoalsTable from "../tables/SetGoals";
import MyGoalsTable from "../tables/MyGoals";

export default function GoalsTable() {
    return (
        <Box>
            <MyGoalsTable/>
            <SetGoalsTable/>
            <Typography variant="h6">You can only set goals for tomorrow, and can only describe you achivements for today's goals; your buddy would only be able to validate today's goals.</Typography>
        </Box>
    )
}