import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Tooltip,
    IconButton,
    Checkbox
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
import BaseTable from "./BaseTable";

const todayStr = getDateStr();

export default function TaskAgendaTable({ renderDone }) {
    const [tasks, setTasks] = useState([]);
    const { openDialog, closeDialog } = useContext(DialogContext);
    const user = (useSelector(state => state.user.user) ?? {});

    const db = getFirestore(firebase);
    useEffect(() => {
        if (!user) return;
        (async () => {
            setTasks((await getDoc(doc(db, "users", user.email, "tasks", todayStr))).data()?.tasks ?? []);
            renderDone();
        })();
    }, [user]);

    return (
        <BaseTable
            title={<>
                Today's Tasks
                <Tooltip enterTouchDelay={0} title="You can only set tasks for tomorrow"><IconButton><InfoIcon /></IconButton></Tooltip>
            </>}
            headers={[
                { label: "Tasks", attributes: { sx: { width: "16em" }}},
                { label: "Note" },
                { attributes: { padding: "checkbox" }}
            ]}
            rows={tasks.map(({ task, note, validated }, idx) => [
                { content: task },
                {
                    content: note,
                    attributes: {
                        sx: { cursor: "pointer" },
                        onClick: () => openDialog((
                            <Dialog open={true} onClose={closeDialog} fullWidth >
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    const note = e.target.note.value;
                                    if (!note) return;
                                    const updatedTasks = tasks.map((g, i) => (i !== idx) ? g : { ...g, note });
                                    setDoc(doc(db, "users", user.email, "tasks", todayStr), { tasks: updatedTasks });
                                    setTasks(updatedTasks);
                                    closeDialog();
                                }}>
                                    <DialogTitle>Modify Task Details</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>Describe how the task was completed</DialogContentText>
                                        <TextField
                                            name="note"
                                            autoFocus
                                            margin="dense"
                                            label="Actions Taken"
                                            fullWidth
                                            defaultValue={note}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={closeDialog}>Cancel</Button>
                                        <Button variant="contained" type="submit">Save</Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        ))
                    }
                },
                {
                    content: (
                        <Checkbox
                            checked={validated ?? false}
                            disabled={Boolean(user?.settings?.goalKeeper)}
                            color="primary"
                            onChange={() => {
                                const updatedTasks = tasks.map((item, i) => (i !== idx) ? item : { ...item, validated: !item.validated });
                                setDoc(doc(db, "users", user.email, "tasks", todayStr), { tasks: updatedTasks });
                                setTasks(updatedTasks);
                            }}
                        />
                    )
                }
            ])}
            emptyPlaceholder="You didn't set any tasks for today, set some for tomorrow"
        />
    )
}