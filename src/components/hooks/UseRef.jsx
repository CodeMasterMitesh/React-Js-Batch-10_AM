import { useRef } from "react";


export const UseRef = () => {

    const firstname = useRef(null);
    const lastname = useRef(null);
    const email = useRef(null);
    const mobile = useRef(null);
    console.log(firstname, lastname, email, mobile);
    const handleSubmitForm = (e) =>{
        e.preventDefault();
        // console.log(e);
        // console.log(firstname, lastname, email, mobile);
        console.log('First Name:', firstname.current.value);
        console.log('Last Name:', lastname.current.value);
        console.log('Email:', email.current.value);
        console.log('Mobile:', mobile.current.value);
    }
    return (
        <>
            <div>
                <h2>Use Ref Example</h2>
            </div>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="firstname">FirstName:</label>
                <input type="text" name="firstname" ref={firstname}  placeholder="Enter something" />
                <br />
                <label htmlFor="lastname">LastName:</label>
                <input type="text" name="lastname" ref={lastname} placeholder="Enter something" />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" ref={email}  placeholder="Enter something" />
                <br />
                <label htmlFor="mobile">Mobile:</label>
                <input type="text" name="mobile" ref={mobile} placeholder="Enter something" />
                <br />
                <button type="submit">Submit</button>
            </form>

            <div>
                <h3>Check console for output</h3>
                <p>First Name: {firstname.current.value}</p>
                <p>Last Name: {lastname.current.value}</p>
                <p>Email: {email.current.value}</p>
                <p>Mobile: {mobile.current.value}</p>
            </div>
        </>

    );
}