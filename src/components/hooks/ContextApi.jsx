import { useContext,createContext, Children } from "react";
// React.createContext() is a function in React's Context API that enables sharing data 
// across the component tree without manually passing props at every level (prop drilling). 
// It is particularly useful for global data like themes, user authentication status, 
// or language preferences

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
    const value = "Hello from Context API!";
    const data = "This is some shared data.";
    return (
        <MyContext.Provider value={{value:value, data:data}}>{children}</MyContext.Provider>
    );
}