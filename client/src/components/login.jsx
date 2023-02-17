import React from 'react'
import { useState } from 'react'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email)
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label for="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

            <label for="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button>Log In</button>
        </form>
        <button>Don't have an account? Register here.</button>
        </div>
       )
}