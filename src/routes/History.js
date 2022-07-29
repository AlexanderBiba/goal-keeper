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
} from "@mui/material";
import { collection, query, getDocs, getFirestore } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import firebase from "../firebase"
import { useSelector } from "react-redux";

export default function History() {
    const [dateGoals, setDateGoals] = useState([]);
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);
    useEffect(() => { (async () => {
        if (!user) return;
        const allGoals = [];
        (await getDocs(query(collection(db, "users", user.email, "goals"))) ?? []).forEach(doc => allGoals.push({
            date: doc.id,
            goals: doc.data().goals
        }));
        setDateGoals(allGoals);
    })(); }, [user]);

    return (
        <Box>
            {dateGoals.map(({ date, goals }, i) => (
                <Box key={i} >
                    <Typography variant="subtitle1" >{date}</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell>Goal</TableCell>
                                    <TableCell>Proof</TableCell>
                                    <TableCell padding="checkbox" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {goals.map(({ goal, proof, validated }, j) => (
                                    <TableRow key={j} >
                                        <TableCell>{goal}</TableCell>
                                        <TableCell>{proof}</TableCell>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={validated ?? false}
                                                color="primary"
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
        </Box>
    )
}