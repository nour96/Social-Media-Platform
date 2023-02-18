import React from 'react'
import { useState } from 'react';
import './App.css'
import { Login } from './components/login.jsx'
import { Register } from './components/register.jsx';

function App() {
    const [currentForm, setCurrentForm] = useState('Login')

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }
    return (
        <div className='App'>
            {
                currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
        </div>
    )
}

export default App;