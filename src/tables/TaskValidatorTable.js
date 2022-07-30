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
import { getDateStr } from "../dateUtils";

const todayStr = getDateStr();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = getDateStr(tomorrow);

export default function TaskValidatorTable({ tomorrow, user, setLoading }) {
    const [tasks, setTasks] = useState([]);

    const db = getFirestore(firebase);
    useEffect(() => {
        if (!user) return;
        (async () => {
            setTasks((await getDoc(doc(db, "users", user, "tasks", tomorrow ? tomorrowStr : todayStr))).data()?.tasks ?? []);
            setLoading(false);
        })();
    }, [user]);

    return (
        <Box component={Paper} sx={{m: "1em", p: "1em"}}>
            <Typography variant="h5">Tasks{ tomorrow ? ' For Tomorrow' : ''}</Typography>
            {tasks.length ? <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={tomorrow ? {} : {width: "16em"}}>Task</TableCell>
                            {!tomorrow && <TableCell>Description</TableCell>}
                            {!tomorrow && <TableCell padding="checkbox" />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((item, idx) => (
                            <TableRow key={idx} >
                                <TableCell>{item.task}</TableCell>
                                {!tomorrow && <TableCell>{item.description}</TableCell>}
                                {!tomorrow && <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={item.validated ?? false}
                                        color="primary"
                                        onChange={() => {
                                            const updatedTasks = tasks.map((item, i) => (i !== idx) ? item : { ...item, validated: !item.validated });
                                            setDoc(doc(db, "users", user, "tasks", tomorrow ? tomorrowStr : todayStr), { tasks: updatedTasks });
                                            setTasks(updatedTasks);
                                        }}
                                    />
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <Box>
                <Typography variant="h6">No tasks set for { tomorrow ? 'tomorrow' : 'today' }</Typography>
            </Box>}
        </Box>
    )
}