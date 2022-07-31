import {
    Button,
    TextField,
    Stack,
    FormControlLabel,
    Checkbox,
    Typography,
    FormGroup,
    Alert,
    Snackbar,
    Backdrop,
    CircularProgress
} from "@mui/material";
import { setDoc, getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import firebase from "../firebase"
import { useSelector, useDispatch } from "react-redux";
import { setUserSettings } from "../redux/user";

export default function Settings() {
    const [settings, setSettings] = useState({ goalKeeper: '', goalKeeperEnabled: false });
    const [successAlert, setSuccessAlert] = useState();
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const db = getFirestore(firebase);
    useEffect(() => {
        if (!user) return;
        (async () => {
            const settings = (await getDoc(doc(db, "users", user.email))).data()?.settings ?? {};
            settings.goalKeeperEnabled = ![null, undefined].includes(settings.goalKeeper)
            setSettings(settings);
            setLoading(false);
        })();
    }, [user]);

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={settings.goalKeeperEnabled}
                        onClick={() => setSettings(settings => ({ ...settings, goalKeeperEnabled: !settings.goalKeeperEnabled }))} />
                }
                label="Designate a Goal Keeper"
            />
            <Typography>Once you make the connection on both ends, you'll be able to see each other's tasks (you designate somebody, and they designate you)</Typography>
            <TextField
                name="goalKeeper"
                value={settings.goalKeeper ?? ""}
                onChange={e => setSettings(settings => ({ ...settings, goalKeeper: e.target.value }))}
                autoFocus
                margin="dense"
                label="Email"
                disabled={!settings.goalKeeperEnabled}
                fullWidth
            />
            <Stack direction="row" justifyContent="flex-end" >
                <Button
                    variant="contained"
                    onClick={async e => {
                        e.preventDefault();
                        const userSettigs = { goalKeeper: settings.goalKeeperEnabled ? settings.goalKeeper : null };
                        await setDoc(doc(db, "users", user.email), { settings: userSettigs });
                        dispatch(setUserSettings(userSettigs));
                        setSuccessAlert(true);
                    }}
                >Save</Button>
            </Stack>
            <Snackbar open={successAlert} autoHideDuration={6000} onClose={() => setSuccessAlert(false)}>
                <Alert onClose={() => setSuccessAlert(false)} severity="success" >Settings saved successfuly</Alert>
            </Snackbar>
            <Backdrop open={loading}><CircularProgress/></Backdrop>
        </FormGroup>
    );
}