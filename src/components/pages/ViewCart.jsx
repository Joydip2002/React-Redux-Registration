import React from 'react';
import { useSelector } from 'react-redux';

const ViewCart = () => {
    const cartData = useSelector((state) => state.cart.cartItem);
    const cart =cartData;
    return (
        <div>
            <h5>My Cart</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {cart ?
                        cart.map((cd,index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row"><img src={cd.thumbnail} width='100px' alt="" /></th>
                                    <td>{cd.title}</td>
                                    <td>{cd.price}</td>
                                </tr>
                            )
                        })
                        : (<p className='text-center fs-4'>Your cart is empty!😢</p>)}
                </tbody>
            </table>
        </div>
    )
}

export default ViewCart
