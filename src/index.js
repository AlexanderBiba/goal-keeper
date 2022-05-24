import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignIn from './SignIn'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename='GoalBuddy'>
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='app' element={<App />} />
        </Routes>
    </BrowserRouter>
);