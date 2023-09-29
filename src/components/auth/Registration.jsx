import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../redux/AuthSlice';
import * as yup from 'yup';
import Home from '../pages/Home';

// yup package for use validation form
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid Email').required('Email is required'),
    address: yup.string().required('Address is required'),
    mobile: yup.string()
        .required('Mobile number required')
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    password: yup.string().required('Password is required'),
})

const Registration = () => {
    const authUser = localStorage.getItem('user');
    if(authUser){
        return(
            <Home/>
        )
    }

    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const [getData, setData] = useState({
        name: '',
        email: '',
        address: '',
        mobile: '',
        password: ''
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await schema.validate(getData, { abortEarly: false })
            setErrors({})
            dispatch(signUpUser(getData))
            setData({
                name: '',
                email: '',
                address: '',
                mobile: '',
                password: ''
            })
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((e) => {
                validationErrors[e.path] = e.message;
            });
            setErrors(validationErrors);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...getData,
            [name]: value,
        })
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className='form-group px-5 py-4 shadow-lg rounded-3'>
                    <h3 className='text-center'>Login</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="">Name</label>
                        <input type="text" name='name' className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={getData.name} onChange={handleChange} />
                        {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                        <label htmlFor="">Email</label>
                        <input type="email" name='email'  className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={getData.email} onChange={handleChange} />
                        {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                        <label htmlFor="">Address</label>
                        <input type="text" name='address' className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={getData.address} onChange={handleChange} />
                        {errors.address && (<div className='invalid-feedback'>{errors.address}</div>)}
                        <label htmlFor="">Mobile</label>
                        <input type="tel" name='mobile' className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} value={getData.mobile} onChange={handleChange} />
                        {errors.mobile && (<div className='invalid-feedback'>{errors.mobile}</div>)}
                        <label htmlFor="">Password</label>
                        <input type="password" name='password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={getData.password} onChange={handleChange} />
                        {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                        <button className='btn btn-outline-success w-100 mt-4'>Register</button>
                    </form>
                    <h6 className='text-center mt-2'>Already Login?&nbsp;<span className='text-warning'><Link to='/login'>Login</Link></span></h6>
                </div>
            </div>
        </>
    )
}

export default Registration
