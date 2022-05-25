import { Button } from '@mui/material';
import firebase from './firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();
    return (
        <div>
            <Button
                onClick={async () => {
                    localStorage.setItem('user', JSON.stringify((await signInWithPopup(getAuth(firebase), new GoogleAuthProvider())).user));
                    navigate('/app');
                }}
                type='submit'
                variant='contained'
                sx={{ mt: 2, mb: 1 }} >
                Sign In With Google
            </Button>
            <h5>{localStorage.getItem('name')}</h5>
            <h5>{localStorage.getItem('email')}</h5>
        </div >
    );
}

