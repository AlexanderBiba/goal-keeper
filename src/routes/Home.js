import {
    Box,
    Typography,
    Paper
} from "@mui/material";

export default function Home() {
    return (
        <Box component={Paper} sx={{ p: "0.75em" }} >
            <Typography variant="h4" sx={{ textAlign: "center" }} >Welcome to Goal Buddy!</Typography>
            <Typography variant="h6">Goal Buddy allows you to set daily goals for tomorrow, describe how you achieve them, and have it reviewed by your Buddy.</Typography>
            <Typography variant="h6">Sign in using the button on the top right, and navigate the menu on the top left to start setting your goals!</Typography>
        </Box>
    );
}