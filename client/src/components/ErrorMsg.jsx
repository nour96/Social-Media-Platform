import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useFormik } from "formik";


export const ErrorMsg = ({ msg }) => {
    return (
        <div style={{ textAlign: 'start', color: 'red', fontSize: 'small'}}>
            {msg}
        </div>
    )
}
    