import {
    Box,
    Typography
} from "@mui/material";
import ValidateTasks from "../tables/ValidateTasks";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDoc, doc, getFirestore } from "firebase/firestore/lite";
import firebase from "../firebase";

export default function TaskValidator() {
    const [userViewed, setUserViewed] = useState("");
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);
    useEffect(() => { (async () => {
        if (!user) return;
        const { goalKeeper } = (await getDoc(doc(db, "users", user.email))).data()?.settings ?? {};
        setUserViewed(goalKeeper || user.email);
    })(); }, [user]);

    return (
        <Box>
            <Typography variant="h6">Viewing Tasks For {userViewed}</Typography>
            <ValidateTasks user={userViewed}/>
            <ValidateTasks user={userViewed} tomorrow={true}/>
            <Typography variant="h6">You can only view your Goal Keeper's tasks if they specify you as their Goal Keeper as well</Typography>
        </Box>
    )
}