// import React from "react";

export const RecactFragment = ()=>{
    // const name = "Alpesh";
    const name = ["Alpesh","Chiren","Mitesh"];
    return (
        // <React.Fragment>
        <>
            <div>Hello {name[0]} how Are You?</div>
             <div>Hello {name[1]} how Are You?</div>
             <div>Hello {name[2]} how Are You?</div>
        </>    
        // </React.Fragment>
    )
}

// this example for dynamic value
export const Text = ({name,education,PassingYear})=>{
    const data = {
        "name" : "Mitesh",
        "education" : "B.COM",
        "PassingYear" : 2013
    }
    return (
        <>  
        {/* this example for dynamic value from object  */}
            <p>My Nam is {data.name} </p>
            <p>My Education is {data.education}</p>
            <p>Passing Year is {data.PassingYear}</p>

             {/* this example for PROPS  */}
            <p>My Nam is {name} </p>
            <p>My Education is {education}</p>
            <p>Passing Year is {PassingYear}</p>
        </>
    )
}

// export default {RecactFragment,Text};