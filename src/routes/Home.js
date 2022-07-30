import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemIcon,
    Avatar
} from "@mui/material";
import {
    Star as StarIcon
} from "@mui/icons-material";

export default function Home() {
    return (
        <Box component={Paper} sx={{ p: "0.75em" }} >
            <Typography variant="h5" sx={{ textAlign: "center" }} >Welcome to Goal Keeper!</Typography>
            <Typography variant="h6">Goal Keeper is a ToDo list with a twist!</Typography>
            <Typography variant="h6">Goal Keeper allows you to:</Typography>
            <List>
                <ListItem>
                    <ListItemAvatar><StarIcon /></ListItemAvatar>
                    <ListItemText primary="Set tasks for tomorrow"/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar><StarIcon /></ListItemAvatar>
                    <ListItemText primary="Validate your tasks"/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar><StarIcon /></ListItemAvatar>
                    <ListItemText primary="Designate a Goal Keeper to validate your tasks"/>
                </ListItem>
            </List>
            <Typography variant="h6">Sign in using the button on the top right, and navigate the menu on the top left to start setting your tasks!</Typography>
        </Box>
    );
}