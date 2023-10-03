import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './redux/AuthSlice';
import CartSlice from './redux/CartSlice'
const store = configureStore({
    reducer: {
        user: AuthSlice,
        cart : CartSlice
    },
})

export default store;