import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './redux/AuthSlice'
const store = configureStore({
    reducer: {
        user: AuthSlice
    },
})

export default store;