import {
    Box,
    Typography,
    Backdrop,
    CircularProgress,
    IconButton,
    Tooltip
} from "@mui/material";
import TaskValidatorTable from "../tables/TaskValidatorTable";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDoc, doc, getFirestore } from "firebase/firestore/lite";
import firebase from "../firebase";
import {
    Info as InfoIcon
} from "@mui/icons-material";

export default function TaskValidator() {
    const [goalKeeper, setGoalKeeper] = useState("");
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);
    useEffect(() => {
        if (!user) return;
        (async () => {
            const { goalKeeper } = (await getDoc(doc(db, "users", user.email))).data()?.settings ?? {};
            setGoalKeeper(goalKeeper);
        })();
    }, [user]);

    const addLoadingComponent = (remainingComponents => () => {
        remainingComponents++;
        return () => (!--remainingComponents) && setLoading(false);
    })(0)

    return (
        <Box>
            <TaskValidatorTable renderDone={addLoadingComponent()} userEmail={goalKeeper}/>
            <TaskValidatorTable renderDone={addLoadingComponent()} userEmail={goalKeeper} tomorrow={true}/>
            <Backdrop open={loading}><CircularProgress/></Backdrop>
            <Typography variant="h6">Viewing Tasks For {goalKeeper}<Tooltip enterTouchDelay={0} title="You can only view your Goal Keeper's tasks if they specify you as their Goal Keeper as well"><IconButton><InfoIcon /></IconButton></Tooltip></Typography>
        </Box>
    )
}