import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite';
import SignIn from './SignIn';

const app = initializeApp({
    apiKey: 'AIzaSyCoVtof9_4DfsWwpVEU71yUFtowZSzLmdE',
    authDomain: 'goalbuddy-da87e.firebaseapp.com',
    projectId: 'goalbuddy-da87e',
    storageBucket: 'goalbuddy-da87e.appspot.com',
    messagingSenderId: '819460212657',
    appId: '1:819460212657:web:1e901728c07bfacb681f90',
    measurementId: 'G-DDVKK8ZZRS'
});

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
    })
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/Goalbuddy" element={<SignIn />} />
            <Route path="app" element={<App db={getFirestore(app)} userId='Alex' buddyId='Miki' />
            } />
        </Routes>
    </BrowserRouter>
);