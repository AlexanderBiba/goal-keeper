import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Checkbox,
    Box,
    Typography
} from "@mui/material";
import { useState, useEffect } from "react";
import { getDoc, setDoc, doc, getFirestore } from "firebase/firestore/lite";
import firebase from "../firebase";
import { useSelector } from "react-redux";
import { getDateStr } from "../dateUtils";

const todayStr = getDateStr();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = getDateStr(tomorrow);

export default function BuddyGoalsTable({ tomorrow }) {
    const [goals, setGoals] = useState([]);
    const [buddy, setBuddy] = useState('')
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);
    useEffect(() => { (async () => {
        if (!user) return;
        const { buddy } = (await getDoc(doc(db, "users", user.email))).data()?.settings ?? {};
        setGoals((await getDoc(doc(db, "users", buddy, "goals", tomorrow ? tomorrowStr : todayStr))).data()?.goals ?? []);
        setBuddy(buddy);
    })(); }, [user]);

    return (
        <Box component={Paper} sx={{m: "1em", p: "1em"}}>
            <Typography variant="h4">Buddy's Goals{ tomorrow ? ' For Tomorrow' : ''}</Typography>
            {goals.length ? <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={tomorrow ? {} : {width: "16em"}}>Goal</TableCell>
                            {!tomorrow && <TableCell>Description</TableCell>}
                            {!tomorrow && <TableCell padding="checkbox" />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goals.map((item, idx) => (
                            <TableRow key={idx} >
                                <TableCell>{item.goal}</TableCell>
                                {!tomorrow && <TableCell>{item.proof}</TableCell>}
                                {!tomorrow && <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={item.validated ?? false}
                                        color="primary"
                                        onChange={() => {
                                            const updatedGoals = goals.map((item, i) => (i !== idx) ? item : { ...item, validated: !item.validated });
                                            setDoc(doc(db, "users", buddy, "goals", tomorrow ? tomorrowStr : todayStr), { goals: updatedGoals });
                                            setGoals(updatedGoals);
                                        }}
                                    />
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <Box>
                <Typography variant="h6">Your buddy did not define any goals for { tomorrow ? 'tomorrow' : 'today' }.</Typography>
            </Box>}
        </Box>
    )
}