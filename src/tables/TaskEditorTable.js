import {
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
import BaseTable from "./BaseTable";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = getDateStr(tomorrow);

export default function TaskEditorTable({ renderDone }) {
    const [tasks, setTasks] = useState([]);
    const { openDialog, closeDialog } = useContext(DialogContext);
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);

    useEffect(() => {
        if (!user) return;
        (async () => {
            setTasks((await getDoc(doc(db, "users", (await user).email, "tasks", tomorrowStr))).data()?.tasks ?? []);
            renderDone();
        })();
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
        <Box>
            <BaseTable
                title="Tomorrow's Tasks"
                headers={[
                    { attributes: { sx: {width: "1em"}}},
                    { label: "Task" }
                ]}
                rows={tasks.map(({ task }, idx) => [
                    { content: (
                        <IconButton
                            onClick={async() => {
                                const updatedTasks = [...tasks];
                                updatedTasks.splice(idx, 1);
                                setDoc(doc(db, "users", user.email, "tasks", tomorrowStr), { tasks: updatedTasks });
                                setTasks(updatedTasks);
                            }} 
                        ><Delete/></IconButton>
                    )},
                    { content: task }
                ]).concat(tasks.length ? [[{
                    attributes: { colSpan: 2, sx: { textAlign: "right" }},
                    content: (
                        <Button
                            variant="contained"
                            onClick={() => openDialog(addNewTaskDialog)}
                        >Add Another Task</Button>
                    )
                }]] : [])}
                emptyPlaceholder={(
                    <>
                        You don't have any tasks set for tomorrow,
                        <Box component="span">
                            <Typography variant="h6"
                                sx={{ cursor: "pointer", color: "blue", p: 0 }}
                                display="inline"
                                onClick={() => openDialog(addNewTaskDialog)}
                            > set first task</Typography>
                        </Box>
                    </>
                )}
            />
        </Box>
    );
}