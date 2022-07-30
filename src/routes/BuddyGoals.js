import {
    Box,
    Typography
} from "@mui/material";
import BuddyGoalsTable from "../tables/BuddyGoals";

export default function BuddyGoals() {
    return (
        <Box>
            <BuddyGoalsTable today={true}/>
            <BuddyGoalsTable tomorrow={true}/>
            <Typography variant="h6">You can only view your buddy's goals if they specify you as their buddy.</Typography>
        </Box>
    )
}