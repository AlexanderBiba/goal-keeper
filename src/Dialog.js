import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@mui/material';
import { useRef } from 'react';

export default function EditProofDialog({ content, open, handleClose }) {
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