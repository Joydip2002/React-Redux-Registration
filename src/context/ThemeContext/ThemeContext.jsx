// import React, { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//     const [themeMode, setThemeMode] = useState('dark');
//     // localStorage.setItem('theme', 'dark');

//     // useEffect(() => {
//     //     if (localStorage.getItem('theme') == 'dark') {
//     //         document.body.classList.add("light");
//     //         setThemeMode('light');
//     //     } else {
//     //         document.body.classList.remove("dark");
//     //         setThemeMode('dark');
//     //     }
//     // },[])

//     return (
//         <ThemeContext.Provider value={{themeMode}}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }

// export const useTheme = () => {
//     return useContext(ThemeContext);
// }