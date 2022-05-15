import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const app = initializeApp({
    apiKey: 'AIzaSyCoVtof9_4DfsWwpVEU71yUFtowZSzLmdE',
    authDomain: 'goalbuddy-da87e.firebaseapp.com',
    projectId: 'goalbuddy-da87e',
    storageBucket: 'goalbuddy-da87e.appspot.com',
    messagingSenderId: '819460212657',
    appId: '1:819460212657:web:1e901728c07bfacb681f90',
    measurementId: 'G-DDVKK8ZZRS'
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App db={getFirestore(app)} userId='Alex' buddyId='Miki' />
    </React.StrictMode>
);