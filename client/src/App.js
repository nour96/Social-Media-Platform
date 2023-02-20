import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx';
import { HomePage } from './pages/home';

function App() {
    const [currentForm, setCurrentForm] = useState('Login')

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }
    return (
        <BrowserRouter>
            <div className='App'>
                <main>
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>

            </div>
        </BrowserRouter>
    )
}

export default App;