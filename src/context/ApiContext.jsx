import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ApiContext = createContext();
const baseUrl = 'http://127.0.0.1:8000/api';

const API = `${baseUrl}/posts`;

export function ApiProvider({children}){

    const [getData,setData] = useState('');

    const callApiFunc=async(url)=>{
        const res = await axios.get(url);
        try {
            const res = await axios.get(url);
            setData(res.data?.posts);
            // console.log(res.data?.posts);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
    }

    useEffect(()=>{
        callApiFunc(API);
    },[])

    return (
        <ApiContext.Provider value={{getData}}>
            {children}
        </ApiContext.Provider>
    )
}

export function useApi(){
    return useContext(ApiContext);
}