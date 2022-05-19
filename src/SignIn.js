import * as React from 'react';
import Button from '@mui/material/Button';
import firebase from './firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const auth = getAuth(firebase);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
    })
}

export default function SignIn() {
    return (
        <div>
            <Button
                onClick={signInWithGoogle}
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
            >
                Sign In With Google
            </Button>

            <h5>{localStorage.getItem("name")}</h5>
            <h5>{localStorage.getItem("email")}</h5>
        </div >
    );
}

