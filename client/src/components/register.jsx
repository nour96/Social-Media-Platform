import React from 'react'
import { useState } from 'react'


export const Register = ({onFormSwitch}) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')

    
    const handleSubmit = (event) => {
        event.preventDefault();
    }


    return (
        <div className='auth-form-container'>
            <h2>Register</h2>
            <form className='register-form' onSubmit={handleSubmit}>
                <label for='name'>name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Full name' id='name' name='name' />


                <label for='email'>email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='youremail@gmail.com' id='email' name='email' />

                <label for='password'>password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='********' id='password' name='password' />
                <button>Register</button>
            </form>
            <button className='link-btn' onClick={() => {onFormSwitch('login')}}>Already have an account? Login here.</button>
        </div>
    )
}