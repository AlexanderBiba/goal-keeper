import {
    Button,
    TextField,
    Stack
} from '@mui/material';
import { setDoc, getDoc, doc } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';

export default function Settings({ db }) {
    const [settings, setSettings] = useState({});
    const userId = JSON.parse(localStorage.getItem('user')).email;

    useEffect(() => { (async () => setSettings((await getDoc(doc(db, 'users', userId))).data()?.settings ?? {}))(); }, []);

    return (
        <form onSubmit={e => {
            e.preventDefault();
            setDoc(doc, { settings });
        }}>
            <TextField
                name='buddy'
                value={settings.buddy ?? ''}
                onChange={e => setSettings(settings => ({ ...settings, buddy: e.target.value}))}
                autoFocus
                margin='dense'
                label='Buddy email'
                fullWidth
            />
            <Stack direction='row' justifyContent='flex-end' >
                <Button
                    variant='contained'
                    type='submit'
                >Save</Button>
            </Stack>
        </form>
    );
}