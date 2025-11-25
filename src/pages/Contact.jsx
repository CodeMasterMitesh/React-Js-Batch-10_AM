import { useContext } from "react";
import { MyContext } from "../components/hooks/ContextApi.jsx";
import Nav from "../components/nav.jsx";
export const Contact = () => {
    const value = useContext(MyContext).value;
    const data = useContext(MyContext).data;
    return (
        <>
            <Nav />
            <div>
                <h1>Contact Page</h1>
                <p>This is the contact page of our application.</p>
                <p>{value}</p>
                <p>{data}</p>
            </div>
        </>

    );

};