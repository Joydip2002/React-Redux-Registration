import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';


localStorage.setItem('theme', 'black')

const Navbar = ({ user, logout }) => {
    // const cart_length = localStorage.getItem('cart-data');
    // const Cart_Length = JSON.parse(cart_length).length;
    const cart_length = useSelector((state) => state.cart.cartItem);
    const getCartLength = cart_length.length;
    const [theme, isSetTheme] = useState('black');

    const setTheme = () => {
        if (localStorage.getItem('theme') == 'black') {
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
            localStorage.setItem('theme', 'white');
            isSetTheme('white');
        }
        else if (localStorage.getItem('theme') == 'white') {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
            localStorage.setItem('theme', 'black');
            isSetTheme('black');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') == 'black') {
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
            localStorage.setItem('theme', 'white');
            isSetTheme('white');
        }
        else if (localStorage.getItem('theme') == 'white') {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
            localStorage.setItem('theme', 'black');
            isSetTheme('black');
        }
    }, [])

    return (
        <>
            <nav className="navbar navbar-dark bg-dark position-sticky top-0 navbar__container">
                <div className="container-fluid d-flex justify-content-between">
                    <span className="navbar-brand mb-0 h1">ZudioShop</span>
                    <h2 className='text-white fs-5'>Name : {user}</h2>

                    <div className='p-3'>
                        {theme == 'black'?(<ion-icon name="moon-outline" onClick={setTheme}></ion-icon>):<ion-icon name="sunny-outline" style={{color:'white'}} onClick={setTheme} ></ion-icon>}
                    </div>
                    <Link to='/view-cart'>
                        <div className='position-relative '>
                            <ion-icon name="cart" size="large"></ion-icon>
                            <span className="position-absolute mt-1 translate-middle badge rounded-pill bg-danger">
                                {getCartLength}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </div>
                    </Link>
                    <button className='btn btn-info rounded-2 shadow-lg' onClick={logout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
