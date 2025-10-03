// props example 
// function Nav(props){
// Props with Destructuring 
function Nav({logoName,homeLink}){
    return (
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
                </ul>
            </div>
        </nav>
    )
}

export default Nav;