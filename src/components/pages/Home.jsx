import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/AuthSlice';
import Login from '../auth/Login';
import Card from '../ProductCard/Card';
import Nabbar from './Navbar/Navbar';
// import { useTheme } from '../../context/ThemeContext/ThemeContext';

const Home = () => {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.email);
    const user2 = useSelector((state) => state.user);
    // console.log("Redux Name", user2);
    // const { theme } = useTheme();

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
    // useEffect(()=>{
    //     document.body.style.backgroundColor = localStorage.getItem('theme');
    // },[theme])
    return (
        <>
            <Nabbar user = {user} logout = {logoutFunc}/>
            <main className='container-fluid'>
                <div className='text-center shadow-lg p-2 rounded-2'>
                    Welcome, <strong>{username}</strong> in our Redux Application.
                </div>
            </main>
            <Card/>
        </>
    )
}

export default Home
