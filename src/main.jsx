import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiProvider } from './context/ApiContext.jsx'
// import { ThemeProvider, useTheme } from './context/ThemeContext/ThemeContext.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
    <ApiProvider>
        <Provider store={store}>
            <ToastContainer />
            <App />
        </Provider>
    </ApiProvider>
)
