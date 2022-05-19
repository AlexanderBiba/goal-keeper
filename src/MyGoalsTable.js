import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { getDoc, updateDoc } from 'firebase/firestore/lite';
import { useDialog } from './DialogProvider';

export default function GoalsTable({ doc }) {
    const [goals, setGoals] = useState([]);
    const [openDialog, closeDialog] = useDialog();
    const textInput = useRef(null);

    useEffect(() => { (async () => setGoals((await getDoc(doc)).data().goals))(); }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        {['goals', 'proof'].map((h, idx) => (<TableCell key={idx}>{h}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {goals.map((item, idx) => (
                        <TableRow key={idx} >
                            <TableCell>{item.goal}</TableCell>
                            <TableCell sx={{ cursor: 'pointer' }} onClick={() => {
                                openDialog({
                                    children: (
                                        <>
                                            <DialogTitle>Modify Goal Achievement</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Fill in how the goal was achieved, this will be validated by your buddy.
                                                </DialogContentText>
                                                <TextField
                                                    inputRef={textInput}
                                                    autoFocus
                                                    margin='dense'
                                                    label='Achievement Proof'
                                                    fullWidth
                                                    defaultValue={item.proof}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => closeDialog()}>Cancel</Button>
                                                <Button onClick={() => {
                                                    const updatedGoals = goals.map((g, i) => (i !== idx) ? g : { ...g, proof: textInput.current.value });
                                                    updateDoc(doc, { goals: updatedGoals });
                                                    setGoals(updatedGoals);
                                                    closeDialog();
                                                }}>Save</Button>
                                            </DialogActions>
                                        </>
                                    )
                                });
                            }}>{item.proof}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}