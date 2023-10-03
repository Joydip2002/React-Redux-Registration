import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from "react-router-dom";

const authuser = localStorage.getItem('user');

const initialState = {
    message: "",
    user: "",
    email: authuser?authuser:'',
    token: "",
    loading: false,
    error: ''
}

// export const signUpUser = createAsyncThunk('signupuser', async (body) => {
//     try {
//         const res = await axios.post("http://127.0.0.1:8000/api/register", body, {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//         if (res.data.status === 400) {
//             toast.error(res.data.failed, {
//                 position: toast.POSITION.TOP_RIGHT
//             });
//         }
//         else {
//             toast.success(res.data.success, {
//                 position: toast.POSITION.TOP_RIGHT
//             });
//         }
//         return await res.json();
//     } catch (error) {
//         toast.error(error.response.data.message, {
//             position: toast.POSITION.TOP_RIGHT
//         });
//         console.error(error);
//     }
// })

// export const signInUser = createAsyncThunk('signinuser', async (body) => {
//     try {
//         const res = await axios.post("http://127.0.0.1:8000/api/registerLogin", body, {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//         if (res.data.status === 400) {
//             toast.error(res.data.failed, {
//                 position: toast.POSITION.TOP_RIGHT
//             });
//         }
//         else {
//             toast.success(res.data.success, {
//                 position: toast.POSITION.TOP_RIGHT
//             });
//         }
//         return await res.json();
//     } catch (error) {
//         // toast.error(res.data.failed, {
//         //     position: toast.POSITION.TOP_RIGHT
//         // });
//         console.error(error);
//     }
// })


export const signUpUser = createAsyncThunk('signupuser', async (body) => {
    
    try {
        const res = await axios.post("http://127.0.0.1:8000/api/register", body, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (res.data.status === 400) {
            toast.error(res.data.failed, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.success(res.data.success, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
        });
        console.error(error);
        throw error;
    }
});

export const signInUser = createAsyncThunk('signinuser', async (body) => {
    // const navigate = useNavigate();
    try {
        const res = await axios.post("http://127.0.0.1:8000/api/registerLogin", body, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (res.data.status === 400) {
            toast.error(res.data.failed, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.success(res.data.success, {
                position: toast.POSITION.TOP_RIGHT
            });
            // navigate('/');
        }
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

// const productsDataApi = createAsyncThunk('productdata',()=>{
//     try {
//         const res = axios.get('');
//     } catch (error) {
//         console.log(error);
//     }
// })

const AuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // addToken: (state, action) => {
        //     state.token = localStorage.getItem('token');
        // },
        addUser: (state, action) => {
            state.email = action.payload.email;
            localStorage.setItem('user', action.payload.email);
        },
        logout: (state, action) => {
            state.token = null;
            localStorage.clear();
            window.location = '/login';
        }
    },
    // extraReducers: {
    //     // SignIn
    //     [signInUser.pending]: (state, action) => {
    //         state.loading = true;
    //     },
    //     [signInUser.fulfilled]: (state, { payload }) => {
    //         state.loading = false
    //         state.user = payload
    //         // state.token = payload.userToken

    //         if (error) {
    //             state.error = error;
    //         }
    //         else {
    //             state.message = message;
    //             state.token = token;
    //             state.user = user;
    //             localStorage.setItem('message', message)
    //             localStorage.setItem('token', token)
    //             localStorage.setItem('user', JSON.stringify(user))
    //         }
    //     },
    //     [signInUser.rejected]: (state, { payload }) => {
    //         state.loading = false
    //         state.error = payload
    //     },

    //     // Signup
    //     [signUpUser.pending]: (state, action) => {
    //         state.loading = true;
    //     },
    //     [signUpUser.fulfilled]: (state, { payload: { error, message } }) => {
    //         state.loading = false;
    //         if (error) {
    //             state.error = error;
    //         }
    //         else {
    //             state.message = 'Register Successfull'
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: state.message,
    //                 text: message,
    //             }).then(() => {
    //                 window.location = '/login';
    //             })
    //         }
    //     },
    //     [signUpUser.rejected]: (state, action) => {
    //         state.loading = true;
    //     }
    // }

    extraReducers: {
        // SignIn
        [signInUser.pending]: (state, action) => {
            state.loading = true;
        },
        [signInUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if (payload.error) {
                state.error = payload.error;
            } else {
                state.message = payload.message;
                state.token = payload.token; 
                state.user = payload.user; 
            }
        },
        [signInUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message; 
        },

        // Signup
        [signUpUser.pending]: (state, action) => {
            state.loading = true;
        },
        [signUpUser.fulfilled]: (state, { payload: { error, message } }) => {
            state.loading = false;
            if (error) {
                state.error = error;
            } else {
                state.message = 'Register Successful';
                Swal.fire({
                    icon: 'success',
                    title: state.message,
                    text: message,
                }).then(() => {
                    window.location = '/login';
                });
            }
        },
        [signUpUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message; 
        },
    }

})
// console.log(AuthSlice);
export const { addToken, addUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer