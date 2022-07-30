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

export default function SetGoalsTable() {
    const [goals, setGoals] = useState([]);
    const { openDialog, closeDialog } = useContext(DialogContext);
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);

    useEffect(() => {
        if (!user) return;
        (async () => setGoals((await getDoc(doc(db, "users", (await user).email, "goals", tomorrowStr))).data()?.goals ?? []))();
    }, [user]);

    const addNewGoalDialog = (
        <Dialog open={true} onClose={closeDialog} fullWidth >
            <form onSubmit={async e => {
                e.preventDefault();
                const goal = e.target.goal.value;
                if (!goal) return;
                const updatedGoals = [...goals, { goal }];
                setDoc(doc(db, "users", user.email, "goals", tomorrowStr), { goals: updatedGoals });
                setGoals(updatedGoals);
                closeDialog();
            }}>
                <DialogTitle>Add New Goal</DialogTitle>
                <DialogContent>
                    <DialogContentText>Set a goal</DialogContentText>
                    <TextField
                        name="goal"
                        autoFocus
                        margin="dense"
                        label="Goal"
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
            <Typography variant="h4">Tomorrow's Goals</Typography>
            {goals.length ? <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{width: "1em"}}></TableCell>
                            <TableCell>Goal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goals.map((item, idx) => (
                            <TableRow key={idx} >
                                <TableCell>
                                    <IconButton
                                        onClick={async() => {
                                            const updatedGoals = [...goals];
                                            updatedGoals.splice(idx, 1);
                                            setDoc(doc(db, "users", user.email, "goals", tomorrowStr), { goals: updatedGoals });
                                            setGoals(updatedGoals);
                                        }} 
                                    ><Delete/></IconButton>
                                </TableCell>
                                <TableCell>{item.goal}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell
                                colSpan={2}
                                sx={{ textAlign: "right" }}
                            ><Button
                                variant="contained"
                                onClick={() => openDialog(addNewGoalDialog)}
                            >Add Another Goal</Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> : <Box>
                <Typography variant="h6">You don't have any goals set for tomorrow,
                    <Box component="span">
                        <Typography variant="h6"
                            sx={{ cursor: "pointer", color: "blue", p: 0 }}
                            display="inline"
                            onClick={() => openDialog(addNewGoalDialog)}
                        > set first goal</Typography>
                    </Box>
                </Typography>
            </Box>}
        </Box>
    );
}