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
    Checkbox,
    Backdrop,
    CircularProgress
} from "@mui/material";
import { collection, query, getDocs, getFirestore } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import firebase from "../firebase"
import { useSelector } from "react-redux";

export default function History() {
    const [dateTasks, setDateTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);
    useEffect(() => {
        if (!user) return;
        (async () => {
            const allTasks = [];
            (await getDocs(query(collection(db, "users", user.email, "tasks"))) ?? []).forEach(doc => doc.data().tasks.length && allTasks.push({
                date: doc.id,
                tasks: doc.data().tasks
            }));
            setDateTasks(allTasks);
            setLoading(false);
        })();
    }, [user]);

    return (
        <Box component={Paper} sx={{p: "1em"}}>
            {dateTasks.length ? dateTasks.map(({ date, tasks }, i) => (
                <Box key={i} >
                    <Typography variant="h5" >{date}</Typography>
                    <TableContainer component={Paper} sx={{my: "0.5em"}}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{width: "12em"}}>Task</TableCell>
                                    <TableCell>Note</TableCell>
                                    <TableCell padding="checkbox" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map(({ task, note, validated }, j) => (
                                    <TableRow key={j} >
                                        <TableCell>{task}</TableCell>
                                        <TableCell>{note}</TableCell>
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
            )) : <Typography>No records found, set some tasks in My Tasks</Typography>}
            <Backdrop open={loading}><CircularProgress/></Backdrop>
        </Box>
    )
}