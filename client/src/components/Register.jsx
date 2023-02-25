import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useFormik } from "formik";
import { ErrorMsg } from './ErrorMsg';
import * as Yup from "yup";


export const Register = ({ onFormSwitch }) => {
    const [err, setErr] = useState(null)
    const navigate = useNavigate();

    const schema = Yup.object({
        firstName: Yup.string().required("Required").min(3, "Must be at least 3 characters long!"),
        lastName: Yup.string().required("Required").min(3, "Must be at least 3 characters long!"),
        email: Yup.string().email('Not a valid email!').required('Required!'),
        password: Yup.string().required('Required!').min(6, "Must be at least 6 characters long!"),
        userName: Yup.string().required('Required!').min(3, "Must be at least 3 characters long!")
    });

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
    } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            axios.post('http://localhost:9080/api/signup', values)
                .then((res) => {
                    setErr(null)
                    gotoLoginPage();
                    console.log(res)
                }, (err) => {
                    console.log(err)
                    setErr(err.response.data)
                })
        },
    });


    const gotoLoginPage = () => navigate("/login");

    return (
        <div className='login-register'>
            <div className='auth-form-container'>
                <h2>Register</h2>
                <form className='register-form' onSubmit={handleSubmit}>
                    <label for='firstName'>First name</label>
                    <input onChange={handleChange} onBlur={handleBlur} type='text' placeholder='First name' id='firstName' name='firstName' />
                    {errors.firstName
                        ? <ErrorMsg msg={errors.firstName} />
                        : null}
                    <label for='lastName'>Last name</label>
                    <input onChange={handleChange} onBlur={handleBlur} type='text' placeholder='Last name' id='lastName' name='lastName' />
                    {touched.lastName && errors.lastName
                        ? <ErrorMsg msg={errors.lastName} />
                        : null}
                    <label for='userName'>Username</label>
                    <input onChange={handleChange} onBlur={handleBlur} type='text' placeholder='Username' id='userName' name='userName' />
                    {touched.userName && errors.userName
                        ? <ErrorMsg msg={errors.userName} />
                        : null}
                    <label for='email'>Email</label>
                    <input onChange={handleChange} onBlur={handleBlur} type='email' placeholder='Youremail@gmail.com' id='email' name='email' />
                    {touched.email && errors.email
                        ? <ErrorMsg msg={errors.email} />
                        : null}
                    <label for='password'>Password</label>
                    <input onChange={handleChange} onBlur={handleBlur} type='password' placeholder='********' id='password' name='password' />
                    {touched.password && errors.password
                        ? <ErrorMsg msg={errors.password} />
                        : null}
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
