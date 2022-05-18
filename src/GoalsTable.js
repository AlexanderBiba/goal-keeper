import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material';
import { useState, useEffect } from 'react';
import EditProofDialog from './Dialog';
import { getDoc } from 'firebase/firestore/lite';

export default function GoalsTable({ doc, header }) {
    const [goals, setGoals] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {(async () => setGoals((await getDoc(doc)).data().goals))();}, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            {header.map((h, idx) => (<TableCell key={idx}>{h}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goals.map((item, idx) => (
                            <TableRow key={idx} >
                                <TableCell>{item.goal}</TableCell>
                                <TableCell
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => setOpenDialog(true)}
                                >
                                    {item.proof}
                                    <EditProofDialog open={openDialog} content={item.proof} handleClose={proof => {
                                        setOpenDialog(false);
                                        if (proof) {
                                            const updatedGoals = goals.map((item, i) => (i !== idx) ? item : { ...item, proof });
                                            updateDoc(doc, { goals: updatedGoals });
                                            setGoals(updatedGoals);
                                        }
                                    }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}