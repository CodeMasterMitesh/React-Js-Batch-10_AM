import React,{useState} from "react";
// props example 
// function Nav(props){
// Props with Destructuring 
function Nav({logoName,homeLink}){
    const [currency,setCurrency] = useState("None");
    // console.log(currency);
    // console.log(e);
    // console.log(setCurrency);
    return (
        <>
            <nav>
                <div className="logo">
                    <h1>{logoName}</h1>
                    {/* <h1>{props.logoName}</h1> */}
                </div>
                <div className="menu">
                    <ul>
                        <li><a href={homeLink}>Home</a></li> 
                        {/* <li><a href={props.homeLink}>Home</a></li>  */}
                        <li><a href="/">About</a></li>
                        <li><a href="/">Services</a></li>
                        <li><a href="/">Blogs</a></li>
                        <li><a href="/">Contact Us</a></li>
                        <li>
                            <select onChange={(e)=> setCurrency(e.target.value)} name="currency" id="currency">
                                <option value="INR">INR</option>
                                <option value="CAD">CAD</option>
                                <option value="US DOLLAR">US DOLLAR</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* <h2>Selected Currency is : {currency}</h2> */}
        </>
        
    )
}

export default Nav;