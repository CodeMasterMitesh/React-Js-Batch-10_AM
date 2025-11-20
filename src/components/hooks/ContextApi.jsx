import { useContext,createContext, Children } from "react";


export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
    const value = "Hello from Context API!";
    const data = "This is some shared data.";
    return (
        <MyContext.Provider value={{value:value, data:data}}>{children}</MyContext.Provider>
    );
}