import {
    Button,
    TextField,
    Stack,
    FormControlLabel,
    Checkbox,
    Typography
} from "@mui/material";
import { setDoc, getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import firebase from "../firebase"
import { useSelector } from "react-redux";

export default function Settings() {
    const [settings, setSettings] = useState({ goalKeeper: '', goalKeeperEnabled: false });
    const user = useSelector(state => state.user.user);

    const db = getFirestore(firebase);
    useEffect(() => {
        if (!user) return;
        (async () => {
            const settings = (await getDoc(doc(db, "users", user.email))).data()?.settings ?? {};
            settings.goalKeeperEnabled = ![null, undefined].includes(settings.goalKeeper)
            setSettings(settings);
        })();
    }, [user]);

    return (
        <form onSubmit={e => {
            e.preventDefault();
            setDoc(doc(db, "users", user.email), { settings: { goalKeeper: settings.goalKeeperEnabled ? settings.goalKeeper : null } });
        }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={settings.goalKeeperEnabled}
                        onClick={() => setSettings(settings => ({ ...settings, goalKeeperEnabled: !settings.goalKeeperEnabled}))}/>
                }
                label="Designate a Goal Keeper"
            />
            <Typography>Once you make the connection on both ends, you'll be able to see each other's tasks (you designate somebody, and he designates you)</Typography>
            <TextField
                name="goalKeeper"
                value={settings.goalKeeper ?? ""}
                onChange={e => setSettings(settings => ({ ...settings, goalKeeper: e.target.value}))}
                autoFocus
                margin="dense"
                label="Email"
                disabled={!settings.goalKeeperEnabled}
                fullWidth
            />
            <Stack direction="row" justifyContent="flex-end" >
                <Button
                    variant="contained"
                    type="submit"
                >Save</Button>
            </Stack>
        </form>
    );
}