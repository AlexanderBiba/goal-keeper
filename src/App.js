import {
    Box,
    Tab,
    Tabs
} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from 'react';
import { getFirestore } from 'firebase/firestore/lite';
import DialogProvider from './DialogProvider';
import firebase from './firebase'
import SetGoals from './tables/SetGoals';
import MyGoals from './tables/MyGoals';
import BuddyGoals from './tables/BuddyGoals';
import Settings from './Settings';
import History from './History';

export default function App() {
    const [tab, setTab] = useState('0');
    const db = getFirestore(firebase);

    return (
        <DialogProvider>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tab}
                        onChange={(_, nextTab) => setTab(nextTab)}
                        variant='scrollable'
                    >
                        <Tab value='0' label='My Goals' />
                        <Tab value='1' label='Buddys Goals' />
                        <Tab value='2' label='Set Goals For Tomorrow' />
                        <Tab value='3' label='History' />
                        <Tab value='4' label='Settings' />
                    </Tabs>
                </Box>
                <TabContext value='0'>
                    <TabPanel value={tab} >
                        <MyGoals db={db} />
                    </TabPanel>
                </TabContext>
                <TabContext value='1'>
                    <TabPanel value={tab} >
                        <BuddyGoals db={db} />
                    </TabPanel>
                </TabContext>
                <TabContext value='2'>
                    <TabPanel value={tab} >
                        <SetGoals db={db} />
                    </TabPanel>
                </TabContext>
                <TabContext value='3'>
                    <TabPanel value={tab} >
                        <History db={db} />
                    </TabPanel>
                </TabContext>
                <TabContext value='4'>
                    <TabPanel value={tab} >
                        <Settings db={db} />
                    </TabPanel>
                </TabContext>
            </Box>
        </DialogProvider>
    );
}
