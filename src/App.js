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
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { useState, useRef, useEffect } from 'react';
import { collection, updateDoc, doc, getDoc } from 'firebase/firestore/lite';

function EditProofDialog({ content, open, handleClose }) {
    const textInput = useRef(null);

    return (
        <Dialog open={open} onClose={() => handleClose()} >
            <DialogTitle>Modify Goal Achievement</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill in how the goal was achieved, this will be validated by your buddy.
                </DialogContentText>
                <TextField
                    inputRef={textInput}
                    autoFocus
                    margin='dense'
                    label='Achievement Proof'
                    fullWidth
                    defaultValue={content}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={() => handleClose(textInput.current.value)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

function MyGoalsTable({ doc }) {
    const [goals, setGoals] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [clickedIndex, setClickedIndex] = useState(null);

    useEffect(() => {(async () => setGoals((await getDoc(doc)).data().goals))();}, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell>Goal</TableCell>
                            <TableCell>Proof</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goals.map((item, idx) => (
                            <TableRow key={idx} >
                                <TableCell>{item.goal}</TableCell>
                                <TableCell
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setDialogContent(item.proof);
                                        setClickedIndex(idx);
                                        setOpenDialog(true);
                                    }}
                                >{item.proof}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditProofDialog open={openDialog} content={dialogContent} handleClose={proof => {
                if (proof) {
                    const updatedGoals = goals.map((item, i) => (i !== clickedIndex) ? item : { ...item, proof });
                    updateDoc(doc, { goals: updatedGoals });
                    setGoals(updatedGoals);
                }
                setDialogContent('');
                setClickedIndex(null);
                setOpenDialog(false);
            }} />
        </div>
    )
}

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
                    <MyGoalsTable doc={doc(users, userId)} />
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