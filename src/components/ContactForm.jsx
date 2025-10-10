import React,{useState} from "react";

export const ContactForm = ()=>{

    const [formData,setFormData] = useState();
    const formDetails = (e)=>{
        e.preventDefault();
        console.log(e.target);
        let name = e.target.name.value;
        let lastName = e.target.lastname.value;
        let email = e.target.email.value;
        let mobile = e.target.mobile.value;
        console.log(name,lastName,email,mobile);
    };
    return (
        <>
            <div id="form">
                <form action="" method="POST" id="contactForm" onSubmit={(e)=> {formDetails(e)}}>
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter Your Name"/>
                    <br />
                    <label htmlFor="">Last Name</label>
                    <input type="text" name="lastname" id="lastname" placeholder="Enter Your LastName"/>
                    <br />
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="email" placeholder="mail@domain.com"/>
                    <br />
                    <label htmlFor="">Mobile Number</label>
                    <input type="text" name="mobile" id="mobile"/>
                    <br />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </>
        
        )
    };