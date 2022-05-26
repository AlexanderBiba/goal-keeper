import {
    Button,
    TextField,
    Stack
} from '@mui/material';
import { setDoc, getDoc, doc, getFirestore } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';
import firebase from '../firebase'

export default function Settings() {
    const [settings, setSettings] = useState({});
    const userId = JSON.parse(localStorage.getItem('user')).email;

    const db = getFirestore(firebase);
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