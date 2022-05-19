import {
    Box,
    Tab,
    Tabs
} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { useState, createContext } from 'react';
import { collection, doc } from 'firebase/firestore/lite';
import MyGoalsTable from './MyGoalsTable';
import BuddyGoalsTable from './BuddyGoalsTable';
import DialogProvider from './DialogProvider';

export default function App({ db, userId, buddyId }) {
    const [tab, setTab] = useState('0');

    const users = collection(db, 'users');

    return (
        <DialogProvider>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)} >
                        <Tab value='0' label='My Items' />
                        <Tab value='1' label='Buddys Items' />
                    </Tabs>
                </Box>
                <TabContext value='0'>
                    <TabPanel value={tab} >
                        <MyGoalsTable doc={doc(users, userId)} />
                    </TabPanel>
                </TabContext>
                <TabContext value='1'>
                    <TabPanel value={tab} >
                        <BuddyGoalsTable doc={doc(users, buddyId)} />
                    </TabPanel>
                </TabContext>
            </Box>
        </DialogProvider>
    );
}