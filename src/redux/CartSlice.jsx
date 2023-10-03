import React from 'react';
import { createSlice } from '@reduxjs/toolkit'

const cartData = localStorage.getItem('cart-data')
const initialState = {
    cartItem : cartData?JSON.parse(cartData):'',
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action)=>{
            const item = action.payload;
            state.cartItem = [...state.cartItem, item];
            // console.log(typeof(state.cartItem));
            localStorage.setItem('cart-data',JSON.stringify(state.cartItem));           
        }
    }
})
export default CartSlice.reducer
export const {addItemToCart} = CartSlice.actions