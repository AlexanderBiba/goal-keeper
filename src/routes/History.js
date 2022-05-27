import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Box,
    Typography,
    Checkbox
} from '@mui/material';
import { collection, query, getDocs, getFirestore } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';
import firebase, { user } from '../firebase'

export default function History() {
    const [dateGoals, setDateGoals] = useState([]);

    const db = getFirestore(firebase);
    useEffect(() => { (async () => {
        const allGoals = [];
        (await getDocs(query(collection(db, 'users', (await user).email, 'goals'))) ?? []).forEach(doc => allGoals.push({
            date: doc.id,
            goals: doc.data().goals
        }));
        setDateGoals(allGoals);
    })(); }, []);

    return (
        <div>
            {dateGoals.map(({ date, goals }, i) => (
                <Box key={i} >
                    <Typography variant='subtitle1' >{date}</Typography>
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
                                {goals.map(({ goal, proof, validated }, j) => (
                                    <TableRow key={j} >
                                        <TableCell>{goal}</TableCell>
                                        <TableCell>{proof}</TableCell>
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                checked={validated ?? false}
                                                color='primary'
                                                disabled
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ))}
        </div>
    )
}