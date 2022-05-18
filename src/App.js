import {
    Box,
    Tab,
    Tabs,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Checkbox
} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { useState,  useEffect } from 'react';
import { collection, updateDoc, doc, getDoc } from 'firebase/firestore/lite';
import GoalsTable from './GoalsTable';

function BuddyGoalsTable({ doc }) {
    const [goals, setGoals] = useState([]);

    useEffect(() => {(async () => setGoals((await getDoc(doc)).data().goals))();}, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>Goal</TableCell>
                        <TableCell>Proof</TableCell>
                        <TableCell padding='checkbox' />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {goals.map((item, idx) => (
                        <TableRow key={idx} >
                            <TableCell>{item.goal}</TableCell>
                            <TableCell>{item.proof}</TableCell>
                            <TableCell padding='checkbox'>
                                <Checkbox
                                    checked={item.validated ?? false}
                                    color='primary'
                                    onChange={() => {
                                        const updatedGoals = goals.map((item, i) => (i !== idx) ? item : { ...item, validated: !item.validated });
                                        updateDoc(doc, { goals: updatedGoals });
                                        setGoals(updatedGoals);
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default function App({ db, userId, buddyId }) {
    const [tab, setTab] = useState('0');

    const users = collection(db, 'users');

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)} >
                    <Tab value='0' label='My Items' />
                    <Tab value='1' label='Buddys Items' />
                </Tabs>
            </Box>
            <TabContext value='0'>
                <TabPanel value={tab} >
                    <GoalsTable doc={doc(users, userId)} header={['goals', 'proof']} />
                </TabPanel>
            </TabContext>
            <TabContext value='1'>
                <TabPanel value={tab} >
                    <BuddyGoalsTable doc={doc(users, buddyId)} />
                </TabPanel>
            </TabContext>
        </Box>
    );
}