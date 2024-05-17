import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { GroupsContextProvider } from './context/GroupContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <AuthContextProvider>
            <GroupsContextProvider>
                <App />
            </GroupsContextProvider>
        </AuthContextProvider>
);
