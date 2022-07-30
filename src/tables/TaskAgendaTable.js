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
    Box,
    Typography,
    Tooltip,
    IconButton
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { setDoc, getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { DialogContext } from "../DialogProvider";
import firebase from "../firebase"
import { useSelector } from "react-redux";
import { getDateStr } from "../dateUtils";
import {
    Info as InfoIcon
} from "@mui/icons-material";

const todayStr = getDateStr();

export default function TaskAgendaTable({ setLoading }) {
    const [tasks, setTasks] = useState([]);
    const { openDialog, closeDialog } = useContext(DialogContext);
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);
    useEffect(() => {
        if (!user) return;
        (async () => {
            setTasks((await getDoc(doc(db, "users", user.email, "tasks", todayStr))).data()?.tasks ?? []);
            setLoading(false);
        })();
    }, [user]);

    return (
        <Box component={Paper} sx={{m: "1em", p: "1em"}}>
            <Typography variant="h5">
                Today's Tasks
                <Tooltip enterTouchDelay={0} title="You can only set tasks for tomorrow"><IconButton><InfoIcon /></IconButton></Tooltip>
            </Typography>
            {tasks.length ? <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{width: "16em"}}>Tasks</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((item, idx) => (
                            <TableRow key={idx} >
                                <TableCell>{item.task}</TableCell>
                                <TableCell
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => openDialog((
                                        <Dialog open={true} onClose={closeDialog} fullWidth >
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                const description = e.target.description.value;
                                                if (!description) return;
                                                const updatedTasks = tasks.map((g, i) => (i !== idx) ? g : { ...g, description });
                                                setDoc(doc(db, "users", user.email, "tasks", todayStr), { tasks: updatedTasks });
                                                setTasks(updatedTasks);
                                                closeDialog();
                                            }}>
                                                <DialogTitle>Modify Task Details</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>Describe how the task was completed</DialogContentText>
                                                    <TextField
                                                        name="description"
                                                        autoFocus
                                                        margin="dense"
                                                        label="Actions Taken"
                                                        fullWidth
                                                        defaultValue={item.description}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={closeDialog}>Cancel</Button>
                                                    <Button variant="contained" type="submit">Save</Button>
                                                </DialogActions>
                                            </form>
                                        </Dialog>
                                    ))}
                                >{item.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <Typography variant="h6">You didn't set any tasks for today, set some for tomorrow</Typography>}
        </Box>
    )
}