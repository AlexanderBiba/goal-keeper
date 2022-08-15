import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut, setUserSettings } from "./redux/user";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import firebase from "./firebase";
import { getDoc, doc, getFirestore, updateDoc, setDoc } from "firebase/firestore/lite";

import { DialogContext } from "./DialogProvider";
import TaskEditor from "./routes/TaskEditor";
import TaskValidator from "./routes/TaskValidator";
import Settings from "./routes/Settings";
import History from "./routes/History";
import Home from "./routes/Home";

import {
    AppBar,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import {
    Menu as MenuIcon,
    LibraryBooks as LibraryBooksIcon,
    LibraryAddCheck as LibraryAddCheckIcon,
    History as HistoryIcon,
    Settings as SettingsIcon,
    Home as HomeIcon
} from "@mui/icons-material";
import {
    createTheme,
    ThemeProvider,
} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h1: {padding: "0.3em 0.75em"},
        h2: {padding: "0.3em 0.75em"},
        h3: {padding: "0.3em 0.75em"},
        h4: {padding: "0.3em 0.75em"},
        h5: {padding: "0.3em 0.75em"},
        h6: {padding: "0.3em 0.75em"},
    }
});

export default function App() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(firebase);
    const db = getFirestore(firebase);
    const { openDialog, closeDialog } = useContext(DialogContext);
    useEffect(() => {
        (async() => {
            if (user?.email) {
                const userData = (await getDoc(doc(db, "users", user.email))).data();
                if (!userData) {
                    await setDoc(doc(db, "users", user.email), {});
                    return;
                }
                const { pendingGoalKeeper } = (userData ?? {});
                if (pendingGoalKeeper) {
                    if (pendingGoalKeeper === user.settings.goalKeeper) await updateDoc(doc(db, "users", user.email), { pendingGoalKeeper: null });
                    else openDialog((
                        <Dialog open={true} onClose={closeDialog} fullWidth >
                            <DialogTitle>Pending Goal Keeper Request</DialogTitle>
                            <DialogContent>
                                <DialogContentText>You have a pending Goal Keeper request from {pendingGoalKeeper}!</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={async() => {
                                    await updateDoc(doc(db, "users", user.email), { pendingGoalKeeper: null });
                                    closeDialog();
                                }}>Decline</Button>
                                <Button onClick={async() => {
                                    const settings = {
                                        ...user.settings,
                                        goalKeeper: pendingGoalKeeper
                                    }
                                    await updateDoc(doc(db, "users", user.email), { pendingGoalKeeper: null, settings });
                                    dispatch(setUserSettings(settings));
                                    closeDialog();
                                }} variant="contained" type="submit">Accept</Button>
                            </DialogActions>
                        </Dialog>
                    ))
                }
            }
        })()
    }, [user])

    const generateDrawerItem = ([text, icon, route], index) => (
        <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => {
                setOpenDrawer(!openDrawer);
                navigate(route);
            }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )

    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <IconButton disabled={!user} onClick={() => setOpenDrawer(!openDrawer)}><MenuIcon /></IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, p: "0.5em" }}>Goal Keeper</Typography>
                    <Button
                        variant="contained"
                        onClick={() => dispatch(
                            user ?
                                async () => {
                                    navigate("home");
                                    dispatch(signOut(await firebaseSignOut(auth)));
                                } :
                                async () => {
                                    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
                                    dispatch(signIn({
                                        email: user.email,
                                        uid: user.uid,
                                        imageUrl: user.photoURL,
                                        displayName: user.displayName,
                                        settings: (await getDoc(doc(db, "users", user.email))).data()?.settings ?? {}
                                    }))
                                }
                        )}
                    >{user ? "Sign Out" : "Sign In"}</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Avatar
                        sx={{ mt: "2em", mb: "1em", width: 96, height: 96 }}
                        src={user?.imageUrl}
                    />
                </Box>
                <List sx={{ width: 250 }}>
                    {[
                        ["Home", <HomeIcon />, "home"]
                    ].map(generateDrawerItem)}
                </List >
                <Divider />
                <List>
                    {[
                        ["Tasks", <LibraryBooksIcon />, "task-editor"]
                    ].concat(user?.settings?.goalKeeper ? [["Validate Tasks", <LibraryAddCheckIcon />, "task-validator"]] : []).concat([
                        ["History", <HistoryIcon />, "history"],
                    ]).map(generateDrawerItem)}
                </List>
                <Divider />
                <List>
                    {[
                        ["Settings", <SettingsIcon />, "settings"]
                    ].map(generateDrawerItem)}
                </List>
            </Drawer>
            <Box sx={{ p: "1em" }}>
                <Routes>
                    <Route
                        path="/"
                        element={(
                            <Navigate to="home" />
                        )}
                    />
                    <Route path="home" element={<Home />} />
                    {user && <Route path="task-editor" element={<TaskEditor/>} />}
                    {user?.settings?.goalKeeper && <Route path="task-validator" element={<TaskValidator/>} />}
                    {user && <Route path="history" element={<History/>} />}
                    {user && <Route path="settings" element={<Settings/>} />}
                </Routes>
            </Box>
        </ThemeProvider>
    )
}