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
import { useState, useContext, useEffect } from 'react';
import { setDoc, getDoc, doc, getFirestore } from 'firebase/firestore/lite';
import { DialogContext } from '../DialogProvider';
import firebase from '../firebase'

export default function GoalsTable() {
    const [goals, setGoals] = useState([]);
    const { openDialog, closeDialog } = useContext(DialogContext);
    const userId = JSON.parse(localStorage.getItem('user')).email;

    const today = new Date();
    today.setUTCHours(0,0,0,0);
    const todayStr = today.toISOString().split('T')[0];

    const db = getFirestore(firebase);
    useEffect(() => { (async () => setGoals((await getDoc(doc(db, 'users', userId, 'goals', todayStr))).data()?.goals ?? []))(); }, []);

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
                            <TableCell
                                sx={{ cursor: 'pointer' }}
                                onClick={() => openDialog((
                                    <Dialog open={true} onClose={closeDialog}>
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            const proof = e.target.proof.value;
                                            if (!proof) return;
                                            const updatedGoals = goals.map((g, i) => (i !== idx) ? g : { ...g, proof });
                                            setDoc(doc, { goals: updatedGoals });
                                            setGoals(updatedGoals);
                                            closeDialog();
                                        }}>
                                            <DialogTitle>Modify Goal Achievement</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>Fill in how the goal was achieved, this will be validated by your buddy.</DialogContentText>
                                                <TextField
                                                    name='proof'
                                                    autoFocus
                                                    margin='dense'
                                                    label='Achievement Proof'
                                                    fullWidth
                                                    defaultValue={item.proof}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={closeDialog}>Cancel</Button>
                                                <Button variant='contained' type='submit'>Save</Button>
                                            </DialogActions>
                                        </form>
                                    </Dialog>
                                ))}
                            >{item.proof}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}