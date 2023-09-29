import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/AuthSlice';
import Login from '../auth/Login';

const Home = () => {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.email);
    const user2 = useSelector((state) => state.user);
    console.log("Redux Name", user2);

    const user = localStorage.getItem('user');
    const authUser = localStorage.getItem('user');
    if (!authUser) {
        return (
            <Login />
        )
    }

    const logoutFunc = () => {
        dispatch(logout());
    }
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid d-flex justify-content-between">
                    <span className="navbar-brand mb-0 h1">Homepage</span>
                    <h2 className='text-white fs-5'>Name : {user}</h2>
                    <button className='btn btn-info rounded-2' onClick={logoutFunc}>Logout</button>
                </div>
            </nav>
            <main className='container'>
                <div className='text-center shadow-lg p-2 rounded-2'>
                    Welcome, <strong>{username}</strong> in our Redux Application.
                </div>
            </main>
        </>
    )
}

export default Home
