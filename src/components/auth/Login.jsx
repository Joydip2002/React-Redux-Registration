import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signInUser } from '../../redux/AuthSlice';
import { addUser } from '../../redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Home from '../pages/Home';


const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
// Using UseState Hook
// const Login = () => {
//   const dispatch = useDispatch();
//   const [getData, setData] = useState({
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await schema.validate(getData, { abortEarly: false });
//       setErrors({});
//       dispatch(signInUser(getData));
//     } catch (err) {
//       const validationErrors = {};
//       err.inner.forEach((e) => {
//         validationErrors[e.path] = e.message;
//       });
//       setErrors(validationErrors);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({
//       ...getData,
//       [name]: value,
//     });
//   };

//   return (
//     <>
//       <div className="container d-flex justify-content-center align-items-center min-vh-100">
//         <div className="form-group px-5 py-4 shadow-lg rounded-3">
//           <h3 className="text-center">Login</h3>
//           <form action="" onSubmit={handleSubmit}>
//             <label htmlFor="">UserName(Email)</label>
//             <input
//               type="email"
//               name="email"
//               className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//               value={getData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <div className="invalid-feedback">{errors.email}</div>
//             )}
//             <label htmlFor="">Password</label>
//             <input
//               type="password"
//               name="password"
//               className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//               value={getData.password}
//               onChange={handleChange}
//             />
//             {errors.password && (
//               <div className="invalid-feedback">{errors.password}</div>
//             )}
//             <button className="btn btn-outline-success w-100 mt-3">Login</button>
//           </form>
//           <h6 className="text-center mt-2">
//             Don't have an account?&nbsp;
//             <span className="text-warning">
//               <Link to="/registration">Register</Link>
//             </span>
//           </h6>
//         </div>
//       </div>
//     </>
//   );
// };


// Using UseForm Hook
const Login = () => {
  const naviagte = useNavigate();
  const authUser = localStorage.getItem('user');

  if (authUser) {
    return (
      <Home />
    )
  }

  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });


  const onSubmit = async (data) => {
    console.log("Data", data);
    try {

      dispatch(signInUser(data))
        .then((response) => {
          if (response?.payload.status === 200) {
            dispatch(addUser(data));
          }
          return naviagte('/');
        })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-group px-5 py-4 shadow-lg rounded-3">
          <h3 className="text-center">Login</h3>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">UserName(Email)</label>
            <input
              type="email"
              name="email"
              {...register('email', { required: true })}
              placeholder='Username'
              className='form-control '
            />

            {errors.email && (
              <div className="text-danger">Username is required</div>
            )}

            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              {...register('password', { required: true })}
              placeholder='Password'
              className='form-control'
            />

            {errors.password && (
              <div className="text-danger">Password is required</div>
            )}

            <button className="btn btn-outline-success w-100 mt-3">Login</button>
          </form>
          <h6 className="text-center mt-2">
            Don't have an account?&nbsp;
            <span className="text-warning">
              <Link to="/registration">Register</Link>
            </span>
          </h6>
        </div>
      </div>
    </>
  )
}

export default Login;
