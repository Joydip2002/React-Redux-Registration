import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

const ViewCart = () => {
    const cartData = useSelector((state) => state.cart.cartItem);
    const cart = cartData;

    // Export Cart Data into PDF using react-to-print package
    const componentRef = useRef();
    const exportCartData = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'CartData-Pdf'
    })


    return (
        <div>
            <h5>My Cart</h5>
            <div ref={componentRef}>
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
                            cart.map((cd, index) => {
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
            <div className="text-center">
                <button onClick={exportCartData} className='btn btn-info rounded-1'>Print</button>
            </div>
        </div>
    )
}

export default ViewCart
