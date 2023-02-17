import React from 'react'
import { useState } from 'react';
import { Login } from "./components/login.jsx"
import { Register } from "./components/register.jsx";

function App() {
    const [currentForm, setCurrentForm] = useState('Login')
    return (
        <div>
            {
                currentForm === 'Login' ? <Login /> : <Register />
            }
        </div>
    )
}

export default App;