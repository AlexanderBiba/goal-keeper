import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut} from "./redux/user";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import firebase from "./firebase";

import DialogProvider from "./DialogProvider";
import SetGoals from "./routes/SetGoals";
import MyGoals from "./routes/MyGoals";
import BuddyGoals from "./routes/BuddyGoals";
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
    Typography
} from "@mui/material";
import {
    Menu as MenuIcon,
    LibraryBooks as LibraryBooksIcon,
    LibraryAdd as LibraryAddIcon,
    LibraryAddCheck as LibraryAddCheckIcon,
    History as HistoryIcon,
    Settings as SettingsIcon
} from "@mui/icons-material";

export default function App() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(firebase);

    return (
        <DialogProvider>
            <AppBar>
                <Toolbar>
                    <IconButton disabled={!user} onClick={() => setOpenDrawer(!openDrawer)}><MenuIcon /></IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, p: "0.5em" }}>Goal Buddy</Typography>
                    <Button
                        variant="contained"
                        onClick={() => dispatch(
                            user ?
                                async () => {
                                    dispatch(signOut(await firebaseSignOut(auth)));
                                } :
                                async () => {
                                    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
                                    dispatch(signIn({
                                        email: user.email,
                                        uid: user.uid,
                                        imageUrl: user.photoURL,
                                        displayName: user.displayName
                                    }))
                                }
                        )}
                    >{user ? "Sign Out" : "Sign In"}</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
                <List sx={{ width: 250 }}>
                    {[
                        ["My Goals", <LibraryBooksIcon />, "my-goals"],
                        ["Buddy Goals", <LibraryAddCheckIcon />, "buddy-goals"],
                        ["Set Goals", <LibraryAddIcon />, "set-goals"],
                        ["History", <HistoryIcon />, "history"],
                    ].map(([text, icon, route], index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => {
                                setOpenDrawer(!openDrawer);
                                navigate(route);
                            }}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {[
                        ["Settings", <SettingsIcon />, "settings"]
                    ].map(([text, icon, route], index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => {
                                setOpenDrawer(!openDrawer);
                                navigate(route);
                            }}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Routes>
                <Route
                    path="/"
                    element={(
                        <Navigate to="home" />
                    )}
                />
                <Route path="home" element={<Home />} />
                <Route path="my-goals" element={<MyGoals />} />
                <Route path="buddy-goals" element={<BuddyGoals />} />
                <Route path="set-goals" element={<SetGoals />} />
                <Route path="history" element={<History />} />
                <Route path="settings" element={<Settings />} />
            </Routes>
        </DialogProvider>
    )
}