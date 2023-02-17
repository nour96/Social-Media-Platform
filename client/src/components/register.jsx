import React from 'react'
import { useState } from 'react'


export const Register = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')

    
    const handleSubmit = (event) => {
        event.preventDefault();
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label for="name">name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name" id="name" name="name" />


                <label for="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label for="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button>Log In</button>
            </form>
            <button>Already have an account? Login here.</button>
        </div>
    )
}