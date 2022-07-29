import {
    Box,
    Typography
} from "@mui/material";

export default function Home() {
    return (
        <Box sx={{ padding: "3em" }} >
            <Typography variant="h3" sx={{ textAlign: "center" }} >Welcome to Goal Buddy!</Typography>
            <Typography variant="h4" sx={{ my: "1em" }} >Goal Buddy allows you to set daily goals for tomorrow, describe how you achieve them, and have it reviewed by your Buddy</Typography>
            <Typography variant="h4" sx={{ my: "1em" }} >Sign in using the button on the top right, and navigate the menu on the top left to start setting your goals!</Typography>
            <Typography variant="p" sx={{ my: "1em" }} >Note: you can only set goals for tomorrow, and can only desribe you achivements for today's goals; your buddy would only be able to validate today's goals</Typography>
        </Box>
    );
}