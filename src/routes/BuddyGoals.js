import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Checkbox
} from "@mui/material";
import { useState, useEffect } from "react";
import { getDoc, setDoc, doc, getFirestore } from "firebase/firestore/lite";
import firebase from "../firebase";
import { useSelector } from "react-redux";

export default function BuddyGoalsTable() {
    const [goals, setGoals] = useState([]);
    const user = useSelector(state => state.user.user);

    const today = new Date();
    today.setUTCHours(0,0,0,0);
    const todayStr = today.toISOString().split("T")[0];

    const db = getFirestore(firebase);
    useEffect(() => { (async () => {
        if (!user) return;
        const { buddy } = (await getDoc(doc(db, "users", user.email))).data()?.settings ?? {};
        setGoals((await getDoc(doc(db, "users", buddy, "goals", todayStr))).data()?.goals ?? []);
    })(); }, [user]);

    return (
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
                    {goals.map((item, idx) => (
                        <TableRow key={idx} >
                            <TableCell>{item.goal}</TableCell>
                            <TableCell>{item.proof}</TableCell>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={item.validated ?? false}
                                    color="primary"
                                    onChange={() => {
                                        const updatedGoals = goals.map((item, i) => (i !== idx) ? item : { ...item, validated: !item.validated });
                                        setDoc(doc, { goals: updatedGoals });
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