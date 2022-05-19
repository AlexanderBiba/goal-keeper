import {
    Box,
    Tab,
    Tabs
} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from 'react';
import { collection, doc, getFirestore } from 'firebase/firestore/lite';
import MyGoalsTable from './MyGoalsTable';
import BuddyGoalsTable from './BuddyGoalsTable';
import DialogProvider from './DialogProvider';
import firebase from "./firebase"
import SetGoalsTable from './SetGoalsTable';

export default function App() {
    const [tab, setTab] = useState('0');
    const db = getFirestore(firebase);
    const users = collection(db, 'users');
    const userId = JSON.parse(localStorage.getItem('user')).email;

    return (
        <DialogProvider>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)} >
                        <Tab value='0' label='My Goals' />
                        <Tab value='1' label='Buddys Goals' />
                        <Tab value='2' label='Set Goals' />
                    </Tabs>
                </Box>
                <TabContext value='0'>
                    <TabPanel value={tab} >
                        <MyGoalsTable doc={doc(users, userId)} />
                    </TabPanel>
                </TabContext>
                <TabContext value='1'>
                    <TabPanel value={tab} >
                        <BuddyGoalsTable doc={doc(users, 'Miki')} />
                    </TabPanel>
                </TabContext>
                <TabContext value='2'>
                    <TabPanel value={tab} >
                        <SetGoalsTable doc={doc(users, userId)} />
                    </TabPanel>
                </TabContext>
            </Box>
        </DialogProvider>
    );
}
