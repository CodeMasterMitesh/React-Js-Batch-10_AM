const handleClick = (mesg) =>{
    alert(mesg);
    console.log(mesg);
}

export const EventHandler = ()=>{
    return (
        <>
            <WelcomeMessage Click={()=>handleClick('Welcome to the Event Handler!')} mouseEnter={ () => alert('Mouse Entered!')} />
        </>
    )
}

export const WelcomeMessage = (props)=>{
    const {Click,mouseEnter,style} = props;

    // const handleMouseEnter = (event) => {
    //     mouseEnter();
    // }

    return (
        <>
            <button onClick={Click}>Click Me</button>
            <button onMouseEnter={mouseEnter} style={style}>
                Hover over me
            </button>
        </>
    )
}