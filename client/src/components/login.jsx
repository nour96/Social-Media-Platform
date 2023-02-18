import React from 'react'
import { useState } from 'react'

export const Login = ({onFormSwitch}) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    return (
        <div className='auth-form-container'>
            <h2>Login</h2>
        <form className='login-form' onSubmit={handleSubmit}>
            <label for='email'>email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='youremail@gmail.com' id='email' name='email'/>

            <label for='password'>password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='********' id='password' name='password'/>
            <button>Log In</button>
        </form>
        <button className='link-btn' onClick={() => {onFormSwitch('register')}}>Don't have an account? Register here.</button>
        </div>
       )
}