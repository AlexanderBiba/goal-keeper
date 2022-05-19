import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Checkbox
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getDoc, updateDoc } from 'firebase/firestore/lite';

export default function BuddyGoalsTable({ doc }) {
    const [goals, setGoals] = useState([]);

    useEffect(() => { (async () => setGoals((await getDoc(doc)).data().goals))(); }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>Goal</TableCell>
                        <TableCell>Proof</TableCell>
                        <TableCell padding='checkbox' />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {goals.map((item, idx) => (
                        <TableRow key={idx} >
                            <TableCell>{item.goal}</TableCell>
                            <TableCell>{item.proof}</TableCell>
                            <TableCell padding='checkbox'>
                                <Checkbox
                                    checked={item.validated ?? false}
                                    color='primary'
                                    onChange={() => {
                                        const updatedGoals = goals.map((item, i) => (i !== idx) ? item : { ...item, validated: !item.validated });
                                        updateDoc(doc, { goals: updatedGoals });
                                        setGoals(updatedGoals);
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}