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
    Button
} from '@mui/material';
import { useState, useEffect, useRef, useContext } from 'react';
import { setDoc, getDoc } from 'firebase/firestore/lite';
import { Delete } from '@mui/icons-material';
import { DialogContext } from '../DialogProvider';

export default function SetGoalsTable({ doc }) {
    const [goals, setGoals] = useState([]);
    const { openDialog, closeDialog } = useContext(DialogContext);

    useEffect(() => { (async () => setGoals((await getDoc(doc)).data()?.goals ?? []))(); }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell><Delete /></TableCell>
                        <TableCell>Goal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {goals.map((item, idx) => (
                        <TableRow key={idx} >
                            <TableCell>
                                <Delete
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        const updatedGoals = [...goals];
                                        updatedGoals.splice(idx, 1);
                                        setDoc(doc, { goals: updatedGoals });
                                        setGoals(updatedGoals);
                                    }} />
                            </TableCell>
                            <TableCell>{item.goal}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell
                            colSpan={2}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => openDialog((
                                <Dialog open={true} onClose={closeDialog}>
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                        const goal = e.target.goal.value;
                                        if (!goal) return;
                                        const updatedGoals = [...goals, { goal }];
                                        setDoc(doc, { goals: updatedGoals });
                                        setGoals(updatedGoals);
                                        closeDialog();
                                    }}>
                                        <DialogTitle>Add New Goal</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>Set a goal</DialogContentText>
                                            <TextField
                                                name='goal'
                                                autoFocus
                                                margin='dense'
                                                label='Goal'
                                                fullWidth
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={closeDialog}>Cancel</Button>
                                            <Button variant='contained' type='submit'>Save</Button>
                                        </DialogActions>
                                    </form>
                                </Dialog>
                            ))}
                        >Add new goal</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}