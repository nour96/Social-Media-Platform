import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from "formik";
import { ErrorMsg } from './ErrorMsg';
import * as Yup from "yup";

export const Login = ({ onFormSwitch }) => {
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .post(
  //       'http://localhost:9080/api/login',
  //       { email, password },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then(
  //       (res) => {
  //         setErr(null);
  //         gotoHomePage();
  //         window.location.reload(false);
  //       },
  //       (err) => {
  //         const { message } = err.response.data;
  //         setErr(message);
  //       }
  //     );
  // };

  const gotoHomePage = () => navigate('/');

  const schema = Yup.object({
    email: Yup.string().email('Not a valid email!').required('Required!'),
    password: Yup.string().required('Required!')
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
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      axios
        .post(
          'http://localhost:9080/api/login',
          values,
          {
            withCredentials: true,
          }
        )
        .then(
          (res) => {
            setErr(null);
            gotoHomePage();
            window.location.reload(false);
          },
          (err) => {
            const { message } = err.response.data;
            setErr(message);
          }
        );
    },
  });

  return (
    <div className="login-register">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label for="email">email</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          {touched.email && errors.email
            ? <ErrorMsg msg={errors.email} />
            : null}

          <label for="password">password</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          {touched.password && errors.password
            ? <ErrorMsg msg={errors.password} />
            : null}
          <button>Log In</button>
        </form>
        <div>{err && <h3 className="error"> {err} </h3>}</div>
        <div>
          <a href="/register">
            <button className="link-btn">
              Don't have an account? Register here.
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
