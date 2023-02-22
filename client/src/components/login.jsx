import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Login = ({ onFormSwitch }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9080/api/login', { email, password }, {
            withCredentials: true,
        })
            .then((res) => {
                setErr(null)
                gotoHomePage();
                console.log(res)
            }, (err) => {
                const { message } = err.response.data
                setErr(message)
            })
    }

    const gotoHomePage = () => navigate("/");


    return (
        <div className='login-register'>
            <div className='auth-form-container'>
                <h2>Login</h2>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label for='email'>email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='youremail@gmail.com' id='email' name='email' />

                    <label for='password'>password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='********' id='password' name='password' />
                    <button>Log In</button>
                </form>
                <div>
                    {err && <h3 className="error"> {err} </h3>}
                </div>
                <div>
                    <a href="/register">
                        <button className='link-btn'>Don't have an account? Register here.</button>
                    </a>
                </div>
            </div >
        </div>
    )
}
