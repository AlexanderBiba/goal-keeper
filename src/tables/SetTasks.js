import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    IconButton,
    Box,
    Typography
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { setDoc, getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { Delete } from "@mui/icons-material";
import { DialogContext } from "../DialogProvider";
import firebase from "../firebase"
import { useSelector } from "react-redux";
import { getDateStr } from "../dateUtils";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = getDateStr(tomorrow);

export default function SetTasksTable() {
    const [tasks, setTasks] = useState([]);
    const { openDialog, closeDialog } = useContext(DialogContext);
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);

    useEffect(() => {
        if (!user) return;
        (async () => setTasks((await getDoc(doc(db, "users", (await user).email, "tasks", tomorrowStr))).data()?.tasks ?? []))();
    }, [user]);

    const addNewTaskDialog = (
        <Dialog open={true} onClose={closeDialog} fullWidth >
            <form onSubmit={async e => {
                e.preventDefault();
                const task = e.target.task.value;
                if (!task) return;
                const updatedTasks = [...tasks, { task }];
                setDoc(doc(db, "users", user.email, "tasks", tomorrowStr), { tasks: updatedTasks });
                setTasks(updatedTasks);
                closeDialog();
            }}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>Set a task</DialogContentText>
                    <TextField
                        name="task"
                        autoFocus
                        margin="dense"
                        label="Task"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button variant="contained" type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    )

    return (
        <Box component={Paper} sx={{m: "1em", p: "1em"}}>
            <Typography variant="h4">Tomorrow's Tasks</Typography>
            {tasks.length ? <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{width: "1em"}}></TableCell>
                            <TableCell>Task</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((item, idx) => (
                            <TableRow key={idx} >
                                <TableCell>
                                    <IconButton
                                        onClick={async() => {
                                            const updatedTasks = [...tasks];
                                            updatedTasks.splice(idx, 1);
                                            setDoc(doc(db, "users", user.email, "tasks", tomorrowStr), { tasks: updatedTasks });
                                            setTasks(updatedTasks);
                                        }} 
                                    ><Delete/></IconButton>
                                </TableCell>
                                <TableCell>{item.task}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell
                                colSpan={2}
                                sx={{ textAlign: "right" }}
                            ><Button
                                variant="contained"
                                onClick={() => openDialog(addNewTaskDialog)}
                            >Add Another Task</Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> : <Box>
                <Typography variant="h6">You don't have any tasks set for tomorrow,
                    <Box component="span">
                        <Typography variant="h6"
                            sx={{ cursor: "pointer", color: "blue", p: 0 }}
                            display="inline"
                            onClick={() => openDialog(addNewTaskDialog)}
                        > set first task</Typography>
                    </Box>
                </Typography>
            </Box>}
        </Box>
    );
}