import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx';
import { HomePage } from './pages/home.js';
import { UserProfile } from './pages/userProfile';

function App() {

    return (
        <BrowserRouter>
            <div className='App'>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/:id" element={<UserProfile />} />
                    </Routes>
                </main>

            </div>
        </BrowserRouter>
    )
}

export default App;