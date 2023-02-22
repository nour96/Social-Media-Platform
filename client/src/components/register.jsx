import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const Register = ({ onFormSwitch }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [err, setErr] = useState(null)
    const navigate = useNavigate();




    const handleSubmit = (event) => {
       event.preventDefault();

        axios.post('http://localhost:9080/api/signup', { firstName, lastName, userName, email, password })
            .then((res) => {
                setErr(null)
                gotoLoginPage();
                console.log(res)
            }, (err) => {
                console.log(err)
                setErr(err.response.data)
            })
    }

    const gotoLoginPage = () => navigate("/login");



    return (
        <div className='login-register'>
            <div className='auth-form-container'>
                <h2>Register</h2>
                <form className='register-form' onSubmit={handleSubmit}>
                    <label for='firstName'>First name</label>
                    <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} type='text' placeholder='First name' id='firstName' name='firstName' />

                    <label for='lastName'>Last name</label>
                    <input required value={lastName} onChange={(e) => setLastName(e.target.value)} type='text' placeholder='Last name' id='lastName' name='lastName' />

                    <label for='userName'>Username</label>
                    <input required value={userName} onChange={(e) => setUserName(e.target.value)} type='text' placeholder='Username' id='userName' name='userName' />

                    <label for='email'>Email</label>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Youremail@gmail.com' id='email' name='email' />

                    <label for='password'>Password</label>
                    <input required value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='********' id='password' name='password' />
                    <button>Register</button>
                </form>
                <div>
                    {err && <h3 className="error"> {err.messages} </h3>}
                </div>
                <div>
                    <a href='/login'>
                        <button className='link-btn'>Already have an account? Login here.</button>
                    </a>
                </div>
            </div>
        </div>
    )
}