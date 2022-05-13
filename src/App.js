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
import { useState, useRef } from 'react';

function EditProofDialog({ content, open, handleClose }) {
    const textInput = useRef(null);

    return (
        <Dialog open={open} onClose={() => handleClose()} >
            <DialogTitle>Modify Goal Achievement</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill in how the goal was proofly achieved, this will be validated by your buddy.
                </DialogContentText>
                <TextField
                    inputRef={textInput}
                    autoFocus
                    margin="dense"
                    label="Achievement Proof"
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

function MyGoalsTable({ items, proofChangedHandler }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleOpenDialog = (content, idx) => {
        setDialogContent(content);
        setClickedIndex(idx);
        setOpenDialog(true);
    }
    const handleCloseDialog = content => {
        console.log(content);
        if (content) proofChangedHandler(clickedIndex, content);
        setDialogContent('');
        setClickedIndex(null);
        setOpenDialog(false);
    }
    
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
                        {items.map((item, idx) => (
                            <TableRow key={idx} >
                                <TableCell>{item.goal}</TableCell>
                                <TableCell
                                    sx={{cursor: "pointer"}}
                                    onClick={() => handleOpenDialog(item.proof, idx)}
                                >{item.proof}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditProofDialog open={openDialog} content={dialogContent} handleClose={handleCloseDialog}/>
        </div>
    )
}

function BuddysGoalsTable({ items }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>Goal</TableCell>
                        <TableCell>Proof</TableCell>
                        <TableCell padding="checkbox" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, idx) => (
                        <TableRow key={idx} >
                            <TableCell>{item.goal}</TableCell>
                            <TableCell>Proof</TableCell>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    onChange={() => console.log('clicked')}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function App() {
    const [tab, setTab] = useState("0");
    const [myItems, setMyItems] = useState([
        {
            goal: "Exercise"
        },
        {
            goal: "Leetcode"
        }
    ]);
    const [buddysItems] = useState([
        {
            goal: "Listen to lectures"
        },
        {
            goal: "Work on project"
        }
    ]);

    const proofChangedHandler = (idx, proof) => setMyItems(myItems.map((item, i) => (i !== idx) ? item : { ...item, proof }));

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)} >
                    <Tab value="0" label="My Items" />
                    <Tab value="1" label="Buddy's Items" />
                </Tabs>
            </Box>
            <TabContext value="0">
                <TabPanel value={tab} >
                    <MyGoalsTable items={myItems} proofChangedHandler={proofChangedHandler} />
                </TabPanel>
            </TabContext>
            <TabContext value="1">
                <TabPanel value={tab} >
                    <BuddysGoalsTable items={buddysItems} />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default App;
