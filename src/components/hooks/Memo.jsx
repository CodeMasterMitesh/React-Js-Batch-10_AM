import React, { useState } from "react";
// import ChildCompoForMemo from "./ChildCompoForMemo.jsx";
import {ChildCompoForMemo} from "./ChildCompoForMemo.jsx";
import {memo} from "react";


const Memo = () => {
    const [count, setCount] = useState(0);
    console.log("Parent Component Rendered", count);
    const increment = () => {
        setCount(count + 1);
    };
    return (
        <>
            <div>
                <h2>Memo Higher Order Component Example</h2>  
                <p>Count: {count}</p>
                <button onClick={increment}>Increment</button>
            </div>
            <ChildCompoForMemo />
        </>
        
    );
}

export default Memo;