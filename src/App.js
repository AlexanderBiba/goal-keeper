import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import DialogProvider from './DialogProvider';
import SignIn from './routes/SignIn'
import SetGoals from './routes/SetGoals';
import MyGoals from './routes/MyGoals';
import BuddyGoals from './routes/BuddyGoals';
import Settings from './routes/Settings';
import History from './routes/History';

import {
    AppBar,
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
} from '@mui/material';
import {
    Menu as MenuIcon,
    LibraryBooks as LibraryBooksIcon,
    LibraryAdd as LibraryAddIcon,
    LibraryAddCheck as LibraryAddCheckIcon,
    History as HistoryIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';

export default function App() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    return (
        <DialogProvider>
            <AppBar>
                <Toolbar>
                    <IconButton onClick={() => setOpenDrawer(!openDrawer)}><MenuIcon /></IconButton>
                    <Typography>Goal Buddy</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
                <List>
                    {[
                        ['My Goals', <LibraryBooksIcon />, '/goal-buddy/my-goals'],
                        ['Buddy Goals', <LibraryAddCheckIcon />, '/goal-buddy/buddy-goals'],
                        ['Set Goals', <LibraryAddIcon />, '/goal-buddy/set-goals'],
                        ['History', <HistoryIcon />, '/goal-buddy/history'],
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
                        ['Settings', <SettingsIcon />, '/goal-buddy/settings'],
                        ['Sign Out', <LogoutIcon />, '/goal-buddy/sign-in']
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
                    path="/goal-buddy"
                    element={(
                        JSON.parse(localStorage.getItem('user'))?.email ?
                            <Navigate to="/goal-buddy/my-goals" /> :
                            <Navigate to="/goal-buddy/sign-in" />
                    )}
                />
                <Route path='/goal-buddy/sign-in' element={<SignIn />} />
                <Route path='/goal-buddy/my-goals' element={<MyGoals />} />
                <Route path='/goal-buddy/buddy-goals' element={<BuddyGoals />} />
                <Route path='/goal-buddy/set-goals' element={<SetGoals />} />
                <Route path='/goal-buddy/history' element={<History />} />
                <Route path='/goal-buddy/settings' element={<Settings />} />
            </Routes>
        </DialogProvider>
    )
}